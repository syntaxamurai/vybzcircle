import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import Navigation from '@/components/Navigation';

interface Profile {
  id?: string;
  user_id?: string;
  display_name: string;
  bio: string;
  phone: string;
  avatar_url: string;
}

interface Purchase {
  id: string;
  total_amount: number;
  purchase_date: string;
  status: string;
  events: {
    title: string;
    venue: string;
    event_date: string;
  } | null;
}

const Profile = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    fetchProfile();
    fetchPurchases();
  }, [user, navigate]);

  const fetchProfile = async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id) // Now guaranteed to exist
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
        // Create default profile if it doesn't exist
        if (error.code === 'PGRST116') {
          setProfile({
            display_name: '',
            bio: '',
            phone: '',
            avatar_url: ''
          });
        }
        return;
      }

      if (data) {
        setProfile({ ...data,
          display_name: data.display_name ?? '',
          bio: data.bio ?? '',
          phone: data.phone ?? '',
          avatar_url: data.avatar_url ?? '',});
      } else {
        // Set default profile if no data
        setProfile({
          display_name: '',
          bio: '',
          phone: '',
          avatar_url: ''
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPurchases = async () => {
    if (!user?.id) {
      return;
    }

    try {
      const { data, error } = await supabase
        .from('purchases')
        .select(`
          id,
          total_amount,
          purchase_date,
          status,
          events (
            title,
            venue,
            event_date
          )
        `)
        .eq('user_id', user.id) // Now guaranteed to exist
        .order('purchase_date', { ascending: false });

      if (error) {
        console.error('Error fetching purchases:', error);
        return;
      }

      setPurchases(data || []);
    } catch (error) {
      console.error('Error fetching purchases:', error);
    }
  };

  const updateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id || !profile) return;

    setSaving(true);
    try {
      const profileData = {
        user_id: user.id,
        display_name: profile.display_name || '',
        bio: profile.bio || '',
        phone: profile.phone || '',
        avatar_url: profile.avatar_url || '',
      };

      const { error } = await supabase
        .from('profiles')
        .upsert(profileData, {
          onConflict: 'user_id'
        });

      if (error) {
        console.error('Profile update error:', error);
        toast({
          title: "Error updating profile",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Profile updated",
          description: "Your profile has been updated successfully.",
        });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20">
        <Navigation />
        <div className="flex items-center justify-center h-96">
          <div className="text-xl">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Profile</h1>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="purchases">Purchase History</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your profile information and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={updateProfile} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="display-name">Display Name</Label>
                      <Input
                        id="display-name"
                        value={profile?.display_name || ''}
                        onChange={(e) => setProfile(prev => prev ? {...prev, display_name: e.target.value} : null)}
                        placeholder="Your display name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={profile?.bio || ''}
                        onChange={(e) => setProfile(prev => prev ? {...prev, bio: e.target.value} : null)}
                        placeholder="Tell us about yourself"
                        rows={3}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={profile?.phone || ''}
                        onChange={(e) => setProfile(prev => prev ? {...prev, phone: e.target.value} : null)}
                        placeholder="Your phone number"
                      />
                    </div>
                    
                    <Button type="submit" disabled={saving}>
                      {saving ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="purchases">
              <Card>
                <CardHeader>
                  <CardTitle>Purchase History</CardTitle>
                  <CardDescription>
                    View your event ticket purchases and transaction history
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {purchases.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                      No purchases yet. Start exploring events!
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {purchases.map((purchase) => (
                        <div key={purchase.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold">{purchase.events?.title || 'Unknown Event'}</h3>
                              <p className="text-sm text-muted-foreground">{purchase.events?.venue || 'Unknown Venue'}</p>
                              <p className="text-sm text-muted-foreground">
                                Event Date: {purchase.events?.event_date ? new Date(purchase.events.event_date).toLocaleDateString() : 'Unknown Date'}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">KSh {purchase.total_amount}</p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(purchase.purchase_date).toLocaleDateString()}
                              </p>
                              <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                                purchase.status === 'completed' 
                                  ? 'bg-green-100 text-green-800' 
                                  : purchase.status === 'pending'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {purchase.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

         <div className="flex justify-end mt-8">
          <Button variant="outline" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  </div>
);
};

export default Profile;
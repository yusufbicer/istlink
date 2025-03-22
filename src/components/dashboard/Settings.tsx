import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { 
  SettingsIcon, 
  UserIcon, 
  BellIcon, 
  ShieldIcon, 
  CreditCardIcon, 
  GlobeIcon, 
  LogOutIcon, 
  TrashIcon, 
  SaveIcon, 
  KeyIcon,
  MailIcon,
  LockIcon,
  AlertTriangleIcon
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Settings = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("account");
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    avatar: user?.avatar || "",
    role: user?.role || "customer"
  });
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    orderUpdates: true,
    marketingEmails: false,
    securityAlerts: true,
    appNotifications: true
  });
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: "30",
    passwordLastChanged: "2023-06-15"
  });
  const [paymentMethods, setPaymentMethods] = useState([
    { id: "pm1", type: "credit_card", last4: "4242", brand: "Visa", expiry: "04/25", isDefault: true },
    { id: "pm2", type: "paypal", email: "user@example.com", isDefault: false }
  ]);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleProfileUpdate = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully."
    });
    setIsEditing(false);
  };

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "New password and confirmation do not match.",
        variant: "destructive"
      });
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 8 characters long.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Password Changed",
      description: "Your password has been updated successfully."
    });

    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
  };

  const handleDeleteAccount = () => {
    toast({
      title: "Account Deleted",
      description: "Your account has been deleted. You will be logged out."
    });
    
    setTimeout(() => {
      logout();
    }, 2000);
  };

  const handleNotificationToggle = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting]
    });
    
    toast({
      title: "Notification Settings Updated",
      description: `${setting} has been ${notificationSettings[setting] ? 'disabled' : 'enabled'}.`
    });
  };

  const handleSecurityToggle = (setting: keyof typeof securitySettings) => {
    if (setting === "twoFactorAuth") {
      setSecuritySettings({
        ...securitySettings,
        twoFactorAuth: !securitySettings.twoFactorAuth
      });
      
      toast({
        title: "Two-Factor Authentication",
        description: `Two-factor authentication has been ${securitySettings.twoFactorAuth ? 'disabled' : 'enabled'}.`
      });
    }
  };

  const handleSessionTimeoutChange = (value: string) => {
    setSecuritySettings({
      ...securitySettings,
      sessionTimeout: value
    });
    
    toast({
      title: "Session Timeout Updated",
      description: `Session timeout has been set to ${value} minutes.`
    });
  };

  const handleSetDefaultPayment = (id: string) => {
    const updatedMethods = paymentMethods.map(method => ({
      ...method,
      isDefault: method.id === id
    }));
    
    setPaymentMethods(updatedMethods);
    
    toast({
      title: "Default Payment Method Updated",
      description: "Your default payment method has been updated."
    });
  };

  const handleRemovePayment = (id: string) => {
    const updatedMethods = paymentMethods.filter(method => method.id !== id);
    setPaymentMethods(updatedMethods);
    
    toast({
      title: "Payment Method Removed",
      description: "The payment method has been removed from your account."
    });
  };

  const getRoleSpecificSettings = () => {
    if (user?.role === "admin") {
      return (
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Admin Controls</CardTitle>
              <CardDescription>
                Special settings available to administrators
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">System Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable maintenance mode to prevent user access during updates
                  </p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">User Management</Label>
                  <p className="text-sm text-muted-foreground">
                    Access user management dashboard
                  </p>
                </div>
                <Button variant="outline">Manage Users</Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">System Logs</Label>
                  <p className="text-sm text-muted-foreground">
                    View system logs and activity
                  </p>
                </div>
                <Button variant="outline">View Logs</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    if (user?.role === "supplier") {
      return (
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Supplier Settings</CardTitle>
              <CardDescription>
                Manage your supplier account settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Business Information</Label>
                  <p className="text-sm text-muted-foreground">
                    Update your business details and tax information
                  </p>
                </div>
                <Button variant="outline">Update</Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Inventory Sync</Label>
                  <p className="text-sm text-muted-foreground">
                    Sync your inventory with external systems
                  </p>
                </div>
                <Select defaultValue="manual">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select sync method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manual">Manual</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="realtime">Real-time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Order Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified immediately for new orders
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return (
      <div>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Customer Preferences</CardTitle>
            <CardDescription>
              Customize your shopping experience
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Default Shipping Address</Label>
                <p className="text-sm text-muted-foreground">
                  Manage your default shipping address
                </p>
              </div>
              <Button variant="outline">Manage</Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Order History</Label>
                <p className="text-sm text-muted-foreground">
                  View your past orders and track current ones
                </p>
              </div>
              <Button variant="outline">View Orders</Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Saved Items</Label>
                <p className="text-sm text-muted-foreground">
                  View and manage your saved items
                </p>
              </div>
              <Button variant="outline">View Saved</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 w-full max-w-3xl">
          <TabsTrigger value="account" className="flex items-center gap-2">
            <UserIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Account</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <BellIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <ShieldIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger value="payment" className="flex items-center gap-2">
            <CreditCardIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Payment</span>
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex items-center gap-2">
            <SettingsIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Advanced</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your account profile information
                  </CardDescription>
                </div>
                <Button 
                  variant={isEditing ? "default" : "outline"}
                  onClick={() => isEditing ? handleProfileUpdate() : setIsEditing(true)}
                >
                  {isEditing ? (
                    <>
                      <SaveIcon className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  ) : (
                    "Edit Profile"
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="flex flex-col items-center gap-2">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={profileData.avatar || "https://i.pravatar.cc/150?img=68"} />
                    <AvatarFallback>{profileData.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button variant="outline" size="sm">
                      Change Avatar
                    </Button>
                  )}
                </div>
                
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        value={profileData.name}
                        onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={profileData.email}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="role">Account Type</Label>
                    <Input 
                      id="role" 
                      value={profileData.role.charAt(0).toUpperCase() + profileData.role.slice(1)}
                      disabled
                    />
                    <p className="text-sm text-muted-foreground">
                      Your account type determines your permissions and access levels
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input 
                  id="current-password" 
                  type="password" 
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input 
                    id="new-password" 
                    type="password" 
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input 
                    id="confirm-password" 
                    type="password" 
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                  />
                </div>
              </div>
              <Button 
                onClick={handlePasswordChange}
                disabled={!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
              >
                <KeyIcon className="mr-2 h-4 w-4" />
                Update Password
              </Button>
            </CardContent>
          </Card>
          
          {getRoleSpecificSettings()}
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>
                Manage how and when you receive email notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive email notifications for important updates
                  </p>
                </div>
                <Switch 
                  checked={notificationSettings.emailNotifications}
                  onCheckedChange={() => handleNotificationToggle("emailNotifications")}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Order Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications about your order status
                  </p>
                </div>
                <Switch 
                  checked={notificationSettings.orderUpdates}
                  onCheckedChange={() => handleNotificationToggle("orderUpdates")}
                  disabled={!notificationSettings.emailNotifications}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Marketing Emails</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive promotional emails and special offers
                  </p>
                </div>
                <Switch 
                  checked={notificationSettings.marketingEmails}
                  onCheckedChange={() => handleNotificationToggle("marketingEmails")}
                  disabled={!notificationSettings.emailNotifications}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Security Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications about security-related events
                  </p>
                </div>
                <Switch 
                  checked={notificationSettings.securityAlerts}
                  onCheckedChange={() => handleNotificationToggle("securityAlerts")}
                  disabled={!notificationSettings.emailNotifications}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>App Notifications</CardTitle>
              <CardDescription>
                Manage in-app notification preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">App Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications within the app
                  </p>
                </div>
                <Switch 
                  checked={notificationSettings.appNotifications}
                  onCheckedChange={() => handleNotificationToggle("appNotifications")}
                />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Notification Sound</Label>
                <Select defaultValue="default">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a sound" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="chime">Chime</SelectItem>
                    <SelectItem value="bell">Bell</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>
                Add an extra layer of security to your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">
                    Require a verification code when logging in
                  </p>
                </div>
                <Switch 
                  checked={securitySettings.twoFactorAuth}
                  onCheckedChange={() => handleSecurityToggle("twoFactorAuth")}
                />
              </div>
              
              {securitySettings.twoFactorAuth && (
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">Verification Methods</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <MailIcon className="h-4 w-4 text-green-600" />
                      <span>Email verification enabled</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <LockIcon className="h-4 w-4" />
                      <span>Authenticator app not configured</span>
                    </div>
                    <Button variant="outline" size="sm" className="mt-2">
                      Configure Authenticator
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Session Settings</CardTitle>
              <CardDescription>
                Manage your active sessions and timeout settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Session Timeout</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically log out after a period of inactivity
                  </p>
                </div>
                <Select 
                  value={securitySettings.sessionTimeout}
                  onValueChange={handleSessionTimeoutChange}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select timeout" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                    <SelectItem value="never">Never</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-base">Active Sessions</Label>
                  <Button variant="outline" size="sm">
                    Log Out All Devices
                  </Button>
                </div>
                <div className="bg-muted p-3 rounded-lg mb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Current Session</p>
                      <p className="text-xs text-muted-foreground">
                        Chrome on Windows • IP: 192.168.1.1
                      </p>
                    </div>
                    <Badge>Active</Badge>
                  </div>
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Mobile App</p>
                      <p className="text-xs text-muted-foreground">
                        iPhone 13 • Last active: 2 days ago
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      Revoke
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Password Security</CardTitle>
              <CardDescription>
                Manage your password security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Password Last Changed</Label>
                  <p className="text-sm text-muted-foreground">
                    {new Date(securitySettings.passwordLastChanged).toLocaleDateString()}
                  </p>
                </div>
                <Button variant="outline" onClick={() => setActiveTab("account")}>
                  Change Password
                </Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Password Requirements</Label>
                  <p className="text-sm text-muted-foreground">
                    Minimum 8 characters with mixed case, numbers, and symbols
                  </p>
                </div>
                <Badge variant="outline">Strong</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="payment" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>
                    Manage your payment methods
                  </CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      Add Payment Method
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Payment Method</DialogTitle>
                      <DialogDescription>
                        Add a new payment method to your account
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="card-type">Payment Type</Label>
                        <Select defaultValue="credit_card">
                          <SelectTrigger>
                            <SelectValue placeholder="Select payment type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="credit_card">Credit Card</SelectItem>
                            <SelectItem value="paypal">PayPal</SelectItem>
                            <SelectItem value="bank">Bank Transfer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="card-number">Card Number</Label>
                        <Input id="card-number" placeholder="1234 5678 9012 3456" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input id="expiry" placeholder="MM/YY" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvc">CVC</Label>
                          <Input id="cvc" placeholder="123" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="name-on-card">Name on Card</Label>
                        <Input id="name-on-card" placeholder="John Smith" />
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button>Add Payment Method</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    {method.type === "credit_card" ? (
                      <div className="h-10 w-14 bg-blue-100 rounded flex items-center justify-center text-blue-800 font-medium">
                        {method.brand}
                      </div>
                    ) : (
                      <div className="h-10 w-14 bg-indigo-100 rounded flex items-center justify-center text-indigo-800 font-medium">
                        PayPal
                      </div>
                    )}
                    <div>
                      <p className="font-medium">
                        {method.type === "credit_card" 
                          ? `${method.brand} •••• ${method.last4}` 
                          : `PayPal - ${method.email}`}
                      </p>
                      {method.type === "credit_card" && (
                        <p className="text-sm text-muted-foreground">
                          Expires {method.expiry}
                        </p>
                      )}
                    </div>
                    {method.isDefault && (
                      <Badge className="ml-2">Default</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {!method.isDefault && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleSetDefaultPayment(method.id)}
                      >
                        Set as Default
                      </Button>
                    )}
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleRemovePayment(method.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
              
              {paymentMethods.length === 0 && (
                <div className="text-center py-6 text-muted-foreground">
                  No payment methods added yet
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Billing Address</CardTitle>
              <CardDescription>
                Manage your billing address
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">123 Main Street</p>
                  <p className="text-sm text-muted-foreground">
                    Apt 4B, New York, NY 10001
                  </p>
                  <p className="text-sm text-muted-foreground">
                    United States
                  </p>
                </div>
                <Button variant="outline">Edit Address</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Language & Region</CardTitle>
              <CardDescription>
                Set your language and regional preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="tr">Turkish</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select defaultValue="utc-5">
                  <SelectTrigger>
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc-8">Pacific Time (UTC-8)</SelectItem>
                    <SelectItem value="utc-5">Eastern Time (UTC-5)</SelectItem>
                    <SelectItem value="utc+0">UTC</SelectItem>
                    <SelectItem value="utc+1">Central European Time (UTC+1)</SelectItem>
                    <SelectItem value="utc+3">Istanbul (UTC+3)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="date-format">Date Format</Label>
                <Select defaultValue="mdy">
                  <SelectTrigger>
                    <SelectValue placeholder="Select date format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                    <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                    <SelectItem value="ymd">YYYY/MM/DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Data & Privacy</CardTitle>
              <CardDescription>
                Manage your data and privacy settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Data Collection</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow us to collect usage data to improve your experience
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Cookie Preferences</Label>
                  <p className="text-sm text-muted-foreground">
                    Manage your cookie preferences
                  </p>
                </div>
                <Button variant="outline">Manage Cookies</Button>
              </div>
              <Separator />
              <div>
                <Button variant="outline" className="w-full">
                  <GlobeIcon className="mr-2 h-4 w-4" />
                  View Privacy Policy
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Account Actions</CardTitle>
              <CardDescription>
                Manage your account status
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Log Out of All Devices</Label>
                  <p className="text-sm text-muted-foreground">
                    Sign out from all devices where you're currently logged in
                  </p>
                </div>
                <Button variant="outline">
                  <LogOutIcon className="mr-2 h-4 w-4" />
                  Log Out All
                </Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Export Your Data</Label>
                  <p className="text-sm text-muted-foreground">
                    Download a copy of your personal data
                  </p>
                </div>
                <Button variant="outline">
                  Export Data
                </Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base text-red-600">Delete Account</Label>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete your account and all your data
                  </p>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">
                      <TrashIcon className="mr-2 h-4 w-4" />
                      Delete Account
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        <div className="space-y-2">
                          <p>
                            This action cannot be undone. This will permanently delete your
                            account and remove your data from our servers.
                          </p>
                          <div className="flex items-center p-3 bg-amber-50 text-amber-900 rounded-md">
                            <AlertTriangleIcon className="h-5 w-5 mr-2 text-amber-600" />
                            <span className="text-sm">
                              All your orders, payment information, and personal data will be lost.
                            </span>
                          </div>
                        </div>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={handleDeleteAccount}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Yes, Delete My Account
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;


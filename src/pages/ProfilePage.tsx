
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Camera, Save } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const profileSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  avatar: z.string().optional(),
  bio: z.string().optional()
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const ProfilePage = () => {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { section } = useParams(); // 'settings' or undefined for main profile
  
  const existingProfile = localStorage.getItem("eco-user-profile");
  const profileData = existingProfile ? JSON.parse(existingProfile) : null;
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: profileData?.name || "",
      email: profileData?.email || "",
      bio: profileData?.bio || "",
      avatar: profileData?.avatar || ""
    }
  });

  useEffect(() => {
    if (profileData?.avatar) {
      setAvatarPreview(profileData.avatar);
    }
  }, [profileData]);

  const onSubmit = (data: ProfileFormValues) => {
    const profileToSave = {
      ...data,
      avatar: avatarPreview || data.avatar
    };
    
    localStorage.setItem("eco-user-profile", JSON.stringify(profileToSave));
    
    toast({
      title: profileData ? "Profile Updated" : "Profile Created",
      description: profileData 
        ? "Your profile has been updated successfully."
        : "Your profile has been created successfully.",
    });
    
    navigate("/");
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setAvatarPreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const isSettings = section === "settings";

  return (
    <Layout>
      <div className="container max-w-3xl py-8">
        <h1 className="text-3xl font-bold mb-8">
          {isSettings ? "Profile Settings" : profileData ? "Your Profile" : "Create Profile"}
        </h1>
        
        <Card>
          <CardHeader>
            <CardTitle>{profileData ? "Edit Profile" : "Create Your Profile"}</CardTitle>
            <CardDescription>
              {profileData 
                ? "Update your personal details and preferences." 
                : "Set up your DeepWaste profile to track your recycling journey."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <Avatar className="h-24 w-24 border-2 border-muted">
                      {avatarPreview ? (
                        <AvatarImage src={avatarPreview} alt="Profile" />
                      ) : (
                        <AvatarFallback className="bg-eco-primary text-white text-2xl">
                          {form.getValues("name") 
                            ? form.getValues("name").charAt(0).toUpperCase()
                            : <User className="h-10 w-10" />}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div className="absolute bottom-0 right-0">
                      <label htmlFor="avatar-upload" className="cursor-pointer">
                        <div className="bg-eco-primary text-white p-2 rounded-full">
                          <Camera className="h-4 w-4" />
                        </div>
                        <input
                          id="avatar-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleAvatarChange}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="your.email@example.com" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Input placeholder="Tell us about yourself" {...field} />
                      </FormControl>
                      <FormDescription>
                        Share a brief description about your recycling goals.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  <Save className="mr-2 h-4 w-4" />
                  {profileData ? "Update Profile" : "Create Profile"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ProfilePage;


import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Navbar from '@/components/ui-custom/Navbar';
import Footer from '@/components/ui-custom/Footer';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Button from '@/components/ui-custom/Button';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const resetPasswordSchema = z.object({
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null);
  const [tokenChecked, setTokenChecked] = useState(false);
  
  const email = searchParams.get('email');
  const token = searchParams.get('token');
  
  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });
  
  // Check if token is valid
  useEffect(() => {
    if (!email || !token) {
      setIsTokenValid(false);
      setTokenChecked(true);
      return;
    }
    
    try {
      // Get reset requests from localStorage
      const resetRequests = JSON.parse(localStorage.getItem('passwordResetRequests') || '{}');
      
      // Check if email has a reset request with matching token that hasn't expired
      const resetRequest = resetRequests[email];
      
      if (resetRequest && 
          resetRequest.token === token && 
          resetRequest.expires > Date.now()) {
        setIsTokenValid(true);
      } else {
        setIsTokenValid(false);
      }
    } catch (error) {
      console.error("Error checking token:", error);
      setIsTokenValid(false);
    }
    
    setTokenChecked(true);
  }, [email, token]);
  
  const onSubmit = async (values: ResetPasswordFormValues) => {
    setIsSubmitting(true);
    
    try {
      // In a real app, this would call an API endpoint to update the password
      // For our demo, we'll update the password in localStorage
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (email) {
        // Get users from localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Find and update the user's password
        const updatedUsers = users.map((user: any) => {
          if (user.email === email) {
            return {
              ...user,
              password: values.password
            };
          }
          return user;
        });
        
        // Save updated users back to localStorage
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        
        // Remove the reset request
        const resetRequests = JSON.parse(localStorage.getItem('passwordResetRequests') || '{}');
        delete resetRequests[email];
        localStorage.setItem('passwordResetRequests', JSON.stringify(resetRequests));
      }
      
      toast({
        title: "Password reset successful",
        description: "Your password has been updated. You can now log in with your new password.",
      });
      
      // Redirect to login page
      setTimeout(() => {
        navigate('/auth/login');
      }, 1500);
      
    } catch (error) {
      console.error("Error resetting password:", error);
      toast({
        title: "Something went wrong",
        description: "We couldn't reset your password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (!tokenChecked) {
    return (
      <>
        <Navbar />
        <main className="pt-24 pb-16 flex items-center min-h-screen">
          <div className="container mx-auto px-4 md:px-6 max-w-md text-center">
            <h1 className="text-2xl font-bold mb-4">Verifying Reset Link</h1>
            <div className="w-10 h-10 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto"></div>
          </div>
        </main>
        <Footer />
      </>
    );
  }
  
  if (isTokenValid === false) {
    return (
      <>
        <Navbar />
        <main className="pt-24 pb-16 flex items-center min-h-screen">
          <div className="container mx-auto px-4 md:px-6 max-w-md">
            <div className="bg-card rounded-lg shadow-sm border p-8 text-center">
              <div className="mx-auto w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="h-6 w-6 text-destructive" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Invalid or Expired Link</h1>
              <p className="text-muted-foreground mb-6">
                This password reset link is invalid or has expired. Please request a new one.
              </p>
              <Link to="/auth/forgot-password">
                <Button className="btn-morocco">
                  Request New Link
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }
  
  return (
    <>
      <Helmet>
        <title>Reset Password | VintedMaghreb</title>
        <meta name="description" content="Create a new password for your VintedMaghreb account" />
      </Helmet>
      
      <Navbar />
      
      <main className="pt-24 pb-16 flex items-center min-h-screen">
        <div className="container mx-auto px-4 md:px-6 max-w-md">
          <Link 
            to="/auth/login" 
            className="inline-flex items-center text-sm font-medium mb-6 hover:text-primary transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to login
          </Link>
          
          <div className="bg-card rounded-lg shadow-sm border p-8">
            <h1 className="text-2xl font-bold mb-2">Reset Your Password</h1>
            <p className="text-muted-foreground mb-6">
              Please create a new password for your account.
            </p>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your new password"
                          type="password"
                          autoComplete="new-password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Confirm your new password"
                          type="password"
                          autoComplete="new-password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button
                  type="submit"
                  className="w-full btn-morocco"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="mr-2">Updating...</span>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    </>
                  ) : (
                    "Reset Password"
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default ResetPassword;

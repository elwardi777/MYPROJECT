
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Navbar from '@/components/ui-custom/Navbar';
import Footer from '@/components/ui-custom/Footer';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Button from '@/components/ui-custom/Button';
import { ArrowLeft, Check } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });
  
  const onSubmit = async (values: ForgotPasswordFormValues) => {
    setIsSubmitting(true);
    
    try {
      // In a real app, this would call an API endpoint to send a reset email
      // For demo purposes, just simulate an email being sent
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log("Password reset requested for:", values.email);
      
      // Create a mock reset token and save it to localStorage for the demo
      const resetToken = Math.random().toString(36).substring(2, 15);
      
      // Store the token with the email in localStorage (in a real app, this would be server-side)
      const resetRequests = JSON.parse(localStorage.getItem('passwordResetRequests') || '{}');
      resetRequests[values.email] = {
        token: resetToken,
        expires: Date.now() + 30 * 60 * 1000  // 30 minutes from now
      };
      localStorage.setItem('passwordResetRequests', JSON.stringify(resetRequests));
      
      // Simulate opening the reset link in a new tab for demo purposes
      // In a real app, this would send an email with a link to the reset page
      // For our demo, we'll open the reset page directly
      window.open(`/auth/reset-password?email=${encodeURIComponent(values.email)}&token=${resetToken}`, '_blank');
      
      setIsSuccess(true);
      
      toast({
        title: "Reset link created",
        description: "A new browser tab will open with instructions to reset your password",
      });
      
    } catch (error) {
      console.error("Error sending reset email:", error);
      toast({
        title: "Something went wrong",
        description: "We couldn't send the password reset link. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <>
      <Helmet>
        <title>Forgot Password | VintedMaghreb</title>
        <meta name="description" content="Reset your password for VintedMaghreb" />
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
            <h1 className="text-2xl font-bold mb-2">Forgot Password</h1>
            <p className="text-muted-foreground mb-6">
              Enter your email address and we'll send you a link to reset your password.
            </p>
            
            {isSuccess ? (
              <div className="text-center p-4">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Check className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-xl font-medium mb-2">Check your browser tabs</h2>
                <p className="text-muted-foreground mb-6">
                  We've opened a new tab with a password reset link for <span className="font-medium">{form.getValues().email}</span>.
                  The link will expire in 30 minutes.
                </p>
                <p className="text-sm text-muted-foreground">
                  Didn't see the new tab? Check your browser tab bar or{" "}
                  <button 
                    type="button" 
                    className="text-primary hover:underline" 
                    onClick={() => setIsSuccess(false)}
                  >
                    try again
                  </button>
                </p>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email address</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your email address"
                            type="email"
                            autoComplete="email"
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
                        <span className="mr-2">Sending...</span>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      </>
                    ) : (
                      "Send reset link"
                    )}
                  </Button>
                </form>
              </Form>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default ForgotPassword;

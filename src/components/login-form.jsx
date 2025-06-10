import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from "@tanstack/react-router"

export function LoginForm({
  className,
  ...props
}) {
  const navigate = useNavigate();
    const [isRegisterMode, setIsRegisterMode] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  
    const handleLogin = (e) => {
      e.preventDefault();
      console.log('Attempting Login with:', { email, password });
      navigate({ to: '/devices' }); 
    };
  
    const handleRegister = (e) => {
      e.preventDefault();
      console.log('Attempting Registration with:', { email, password, confirmPassword });
      console.log('Registration process initiated. Navigating to dashboard.');
      navigate({ to: '/devices' }); 
    };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={isRegisterMode ? handleRegister : handleLogin}> 
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                   {isRegisterMode ? "Register" : "Login"}
                </Button>
                <Button variant="outline" className="w-full">
                  Login with Google
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
            {isRegisterMode ? "Already have an account?" : "Don't have an account?"}{' '}
                <button
            onClick={() => setIsRegisterMode(!isRegisterMode)}
            className="text-cyan-600 hover:underline font-medium focus:outline-none"
          >
            {isRegisterMode ? "Login here" : "Register here"}
          </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

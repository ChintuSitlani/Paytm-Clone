import { Button } from "./button";

interface AppbarProps {
    user?: {
        name?: string | null;
    },
    // TODO: can u figure out what the type should be here?
    onSignin: any,
    onSignout: any
}
export const Appbar = ({
    user,
    onSignin,
    onSignout
  }: AppbarProps) => {
    return (
      <div className="flex justify-between items-center px-6 h-16 bg-[#ebe6e6] border-b border-border">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/4/42/Paytm_logo.png?20170729032638"
          alt="Paytm Logo"
          className="w-28 h-8 object-contain"
        />
        <Button onClick={user ? onSignout : onSignin}>
          {user ? "Logout" : "Login"}
        </Button>
      </div>
    );
  };
  
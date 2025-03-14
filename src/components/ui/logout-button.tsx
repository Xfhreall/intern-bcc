"use client";

import { LogOut } from "lucide-react";

import { useLogout } from "@/hooks/useLogout";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const logout = useLogout();

  return (
    <Button
      className="flex items-center justify-start w-full gap-2 bg-red-600 border-none hover:bg-red-800"
      disabled={logout.isPending}

      onClick={() => logout.mutate()}
    >
      <LogOut className="w-4 h-4" />
      {logout.isPending ? "Logging out..." : "Logout"}
    </Button>
  );
}

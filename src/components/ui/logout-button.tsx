"use client";

import { LogOut } from "lucide-react";

import { useLogout } from "@/hooks/useLogout";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const logout = useLogout();

  return (
    <Button
      className="flex items-center gap-2"
      disabled={logout.isPending}
      variant="outline"
      onClick={() => logout.mutate()}
    >
      <LogOut className="w-4 h-4" />
      {logout.isPending ? "Logging out..." : "Logout"}
    </Button>
  );
}

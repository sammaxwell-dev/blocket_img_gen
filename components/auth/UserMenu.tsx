"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Settings, LogOut, CreditCard } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface UserMenuProps {
    user: {
        email?: string
        user_metadata?: {
            full_name?: string
            avatar_url?: string
        }
    }
}

export function UserMenu({ user }: UserMenuProps) {
    const supabase = createClient()
    const router = useRouter()

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.refresh()
    }

    const name = user.user_metadata?.full_name || user.email?.split('@')[0] || "User"
    const avatarUrl = user.user_metadata?.avatar_url

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full border border-gray-100 hover:bg-gray-50 p-0 overflow-hidden">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={avatarUrl} alt={name} />
                        <AvatarFallback className="bg-primary/5 text-primary text-xs">
                            {name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mt-2 rounded-xl border-gray-200/50 shadow-xl shadow-gray-200/20" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none text-gray-900">{name}</p>
                        <p className="text-xs leading-none text-gray-500">{user.email}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-100" />
                <DropdownMenuItem asChild className="focus:bg-gray-50 focus:text-gray-900 rounded-lg cursor-pointer">
                    <Link href="/profile" className="flex items-center">
                        <User className="mr-2 h-4 w-4 text-gray-400" />
                        <span>Profile</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="focus:bg-gray-50 focus:text-gray-900 rounded-lg cursor-pointer">
                    <Link href="/pricing" className="flex items-center">
                        <CreditCard className="mr-2 h-4 w-4 text-gray-400" />
                        <span>Subscription</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-100" />
                <DropdownMenuItem
                    onClick={handleLogout}
                    className="focus:bg-red-50 focus:text-red-600 text-red-600 rounded-lg cursor-pointer"
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

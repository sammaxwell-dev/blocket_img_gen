import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { User, Mail, Calendar, Sparkles } from "lucide-react"

export default async function ProfilePage() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return redirect('/login')
    }

    const name = user.user_metadata?.full_name || user.email?.split('@')[0] || "User"
    const avatarUrl = user.user_metadata?.avatar_url
    const createdAt = new Date(user.created_at).toLocaleDateString()

    return (
        <div className="min-h-screen pt-32 pb-12 px-4">
            <div className="container mx-auto max-w-4xl">
                <h1 className="text-3xl font-bold mb-8 text-gray-900">Your Account</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Sidebar / Profile Card */}
                    <Card className="md:col-span-1 border-gray-200/50 shadow-xl shadow-gray-200/20 h-fit bg-white/80 backdrop-blur-sm">
                        <CardHeader className="text-center">
                            <div className="flex justify-center mb-4">
                                <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                                    <AvatarImage src={avatarUrl} alt={name} />
                                    <AvatarFallback className="bg-primary/5 text-primary text-2xl font-bold">
                                        {name.charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                            <CardTitle className="text-xl">{name}</CardTitle>
                            <CardDescription>{user.email}</CardDescription>
                            <div className="pt-2">
                                <Badge variant="secondary" className="bg-primary/10 text-primary border-none rounded-full px-3 py-1">
                                    Free Plan
                                </Badge>
                            </div>
                        </CardHeader>
                    </Card>

                    {/* Main Info */}
                    <div className="md:col-span-2 space-y-6">
                        <Card className="border-gray-200/50 shadow-xl shadow-gray-200/20 bg-white/80 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-lg">Personal Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/50 border border-transparent hover:border-gray-100 transition-all">
                                    <div className="bg-white p-2 rounded-lg shadow-sm">
                                        <Mail className="w-4 h-4 text-gray-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Email Address</p>
                                        <p className="text-sm font-medium text-gray-900">{user.email}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/50 border border-transparent hover:border-gray-100 transition-all">
                                    <div className="bg-white p-2 rounded-lg shadow-sm">
                                        <User className="w-4 h-4 text-gray-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Full Name</p>
                                        <p className="text-sm font-medium text-gray-900">{name}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/50 border border-transparent hover:border-gray-100 transition-all">
                                    <div className="bg-white p-2 rounded-lg shadow-sm">
                                        <Calendar className="w-4 h-4 text-gray-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Member Since</p>
                                        <p className="text-sm font-medium text-gray-900">{createdAt}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-gray-200/50 shadow-xl shadow-gray-200/20 bg-white/80 backdrop-blur-sm">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg">Subscription</CardTitle>
                                    <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/5 via-primary/10 to-transparent border border-primary/10">
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">Upgrade to Pro</h3>
                                    <p className="text-sm text-gray-600 mb-6">
                                        Get unlimited photo enhancements, priority processing, and HD downloads for only 99 SEK/month.
                                    </p>
                                    <button className="px-6 py-2 bg-primary text-white rounded-full font-medium shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
                                        View Pricing
                                    </button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

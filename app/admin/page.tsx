// app/admin/page.tsx
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Users, Mail, Calendar, Search, Download, Copy, CheckCircle, Sparkles, ArrowRight, UserCheck, Clock, TrendingUp } from "lucide-react";

type User = {
  id: string;
  email: string;
  role: string;
  created_at: string;
};

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Password protection
  useEffect(() => {
    // Check if already authorized in this session
    const alreadyAuthorized = sessionStorage.getItem("adminAuthorized");
    
    if (alreadyAuthorized === "true") {
      setIsAuthorized(true);
      setIsLoading(false);
      fetchUsers();
      return;
    }

    const checkPassword = () => {
      const password = prompt("🔐 Enter admin password to access the dashboard:");
      
      if (password === "prevail123") {
        sessionStorage.setItem("adminAuthorized", "true");
        setIsAuthorized(true);
        setIsLoading(false);
        fetchUsers();
      } else if (password === null) {
        // User cancelled - redirect to home
        window.location.href = "/";
      } else {
        alert("❌ Wrong password! Please try again.");
        checkPassword(); // Recursively ask again
      }
    };

    checkPassword();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await supabase
        .from("waitlist")
        .select("*")
        .order("created_at", { ascending: false });
      setUsers(data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Show loading state while checking authorization
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFCD94]/20 via-[#F9F8F6] to-white">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#38226C] to-[#6A4DFB] flex items-center justify-center animate-pulse">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <p className="text-[#1A1A2E]/60">Verifying access...</p>
        </div>
      </div>
    );
  }

  // Don't render anything if not authorized
  if (!isAuthorized) {
    return null;
  }

  const filteredUsers = users.filter((u) =>
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  const handleExportCSV = () => {
    const headers = ["Email", "Role", "Joined Date"];
    const csvData = filteredUsers.map((user) => [
      user.email,
      user.role,
      new Date(user.created_at).toLocaleDateString(),
    ]);
    
    const csvContent = [headers, ...csvData]
      .map((row) => row.join(","))
      .join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `waitlist-users-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Calculate stats
  const uniqueRoles = Array.from(
    new Set((users || []).map((u) => u.role || ""))
  );
  const today = new Date().toDateString(); 
  const todayJoins = (users || []).filter((u) =>u.created_at && new Date(u.created_at).toDateString() === today).length;

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-[120px] pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFCD94]/20 via-[#F9F8F6] to-white" />
        <div className="absolute top-[-20%] right-[-10%] h-[600px] w-[600px] rounded-full bg-[#6A4DFB]/5 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-5%] h-[500px] w-[500px] rounded-full bg-[#FFB252]/10 blur-3xl" />
        
        <div className="relative max-w-8xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-[#38226C]/5 border border-[#38226C]/10 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#6A4DFB]" />
              <span className="text-xs font-bold tracking-widest text-[#38226C] uppercase">Admin Portal</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl font-extrabold text-[#1A1A2E] leading-[1.1] tracking-tight mb-4">
              Waitlist{" "}
              <span className="bg-gradient-to-r from-[#38226C] via-[#6A4DFB] to-[#FFB252] bg-clip-text text-transparent">
                Management
              </span>
            </h1>
            <p className="text-lg text-[#1A1A2E]/60 max-w-2xl mx-auto">
              View and manage all users who have joined the Prevail waitlist.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 relative">
        <div className="max-w-8xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid md:grid-cols-4 gap-6">
            {/* Total Users */}
            <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-white via-[#F9F8F6] to-[#FFCD94]/10 border border-[#1A1A2E]/8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#38226C]/10 flex items-center justify-center group-hover:bg-[#38226C] transition-colors duration-300">
                  <Users className="w-5 h-5 text-[#6A4DFB] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-semibold text-[#1A1A2E]">Total Users</h3>
              </div>
              <p className="text-4xl font-extrabold bg-gradient-to-r from-[#38226C] to-[#6A4DFB] bg-clip-text text-transparent">
                {users.length}
              </p>
              <p className="text-xs text-[#1A1A2E]/40 mt-2">Registered waitlist members</p>
            </div>

            {/* Today's Joins */}
            <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-white via-[#F9F8F6] to-[#FFCD94]/10 border border-[#1A1A2E]/8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#FFB252]/10 flex items-center justify-center group-hover:bg-[#FFB252] transition-colors duration-300">
                  <Calendar className="w-5 h-5 text-[#FFB252] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-semibold text-[#1A1A2E]">Today's Joins</h3>
              </div>
              <p className="text-4xl font-extrabold text-[#FFB252]">
                {todayJoins}
              </p>
              <p className="text-xs text-[#1A1A2E]/40 mt-2">New users today</p>
            </div>

            {/* Unique Roles */}
            <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-white via-[#F9F8F6] to-[#FFCD94]/10 border border-[#1A1A2E]/8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#6A4DFB]/10 flex items-center justify-center group-hover:bg-[#6A4DFB] transition-colors duration-300">
                  <UserCheck className="w-5 h-5 text-[#6A4DFB] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-semibold text-[#1A1A2E]">User Types</h3>
              </div>
              <p className="text-4xl font-extrabold text-[#6A4DFB]">
                {uniqueRoles.length}
              </p>
              <p className="text-xs text-[#1A1A2E]/40 mt-2">Distinct roles</p>
            </div>

            {/* Latest Email */}
            <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-white via-[#F9F8F6] to-[#FFCD94]/10 border border-[#1A1A2E]/8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#38226C]/10 flex items-center justify-center group-hover:bg-[#38226C] transition-colors duration-300">
                  <Mail className="w-5 h-5 text-[#38226C] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-semibold text-[#1A1A2E]">Latest Signup</h3>
              </div>
              <p className="text-sm font-medium text-[#1A1A2E] truncate">
                {users[0]?.email || "No data"}
              </p>
              <p className="text-xs text-[#1A1A2E]/40 mt-1">
                {users[0] ? new Date(users[0].created_at).toLocaleDateString() : "-"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Users Table Section */}
      <section className="py-12 relative">
        <div className="max-w-8xl mx-auto px-5 sm:px-8 lg:px-10">
          {/* Search and Export Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1A1A2E]/40" />
              <input
                type="text"
                placeholder="Search by email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-[#1A1A2E]/10 rounded-xl text-sm text-[#1A1A2E] placeholder:text-[#1A1A2E]/40 focus:outline-none focus:border-[#6A4DFB] focus:ring-2 focus:ring-[#6A4DFB]/20 transition-all duration-300"
              />
            </div>
            
            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-[#38226C] to-[#6A4DFB] text-white text-sm font-semibold rounded-xl hover:from-[#2D1A56] hover:to-[#5A3DE8] hover:-translate-y-0.5 transition-all duration-300 shadow-md shadow-[#38226C]/25"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-2xl shadow-xl border border-[#1A1A2E]/8 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gradient-to-r from-[#38226C]/5 to-[#6A4DFB]/5 border-b border-[#1A1A2E]/8">
                  <tr>
                    <th className="p-4 text-left font-semibold text-[#1A1A2E]">Email</th>
                    <th className="p-4 text-left font-semibold text-[#1A1A2E]">Role</th>
                    <th className="p-4 text-left font-semibold text-[#1A1A2E]">Joined Date</th>
                    <th className="p-4 text-left font-semibold text-[#1A1A2E]">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-[#1A1A2E]/5 hover:bg-[#F9F8F6] transition-all duration-200"
                    >
                      <td className="p-4 text-[#1A1A2E]/80">{user.email}</td>
                      <td className="p-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#38226C]/10 text-[#38226C] capitalize">
                          {user.role || "Not specified"}
                        </span>
                      </td>
                      <td className="p-4 text-[#1A1A2E]/60 text-sm">
                        {new Date(user.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                        <span className="text-xs text-[#1A1A2E]/40 ml-2">
                          {new Date(user.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => handleCopyEmail(user.email)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#6A4DFB]/10 text-[#6A4DFB] text-xs font-medium rounded-lg hover:bg-[#6A4DFB] hover:text-white transition-all duration-200"
                        >
                          {copiedEmail === user.email ? (
                            <>
                              <CheckCircle className="w-3.5 h-3.5" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              Copy Email
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredUsers.length === 0 && (
              <div className="p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#38226C]/5 flex items-center justify-center">
                  <Users className="w-8 h-8 text-[#1A1A2E]/30" />
                </div>
                <p className="text-[#1A1A2E]/40 font-medium">No users found</p>
                <p className="text-[#1A1A2E]/30 text-sm mt-1">Try adjusting your search</p>
              </div>
            )}
          </div>

          {/* Footer Stats */}
          <div className="mt-6 flex justify-between items-center text-sm text-[#1A1A2E]/50">
            <p>
              Showing <span className="font-semibold text-[#1A1A2E]">{filteredUsers.length}</span> of{" "}
              <span className="font-semibold text-[#1A1A2E]">{users.length}</span> users
            </p>
            <p>Last updated: {new Date().toLocaleString()}</p>
          </div>
        </div>
      </section>
    </>
  );
}
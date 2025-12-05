"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Users, UserPlus, Star, Flame, Circle, Lock, Globe, Settings, Bell, Check } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import { useUser } from '@/hooks/useUser';

// Animation Variants
const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export default function FriendsPage() {
    const { user } = useUser();
    console.log("FriendsPage User:", user, "Role:", user?.role);
    const [activeTab, setActiveTab] = useState<'leaderboard' | 'friends'>('friends');
    const [showGroupModal, setShowGroupModal] = useState(false);
    const [showManageModal, setShowManageModal] = useState<number | null>(null); // ID of group being managed

    // State for Leaderboard
    const [leaderboard, setLeaderboard] = useState<any[]>([]);

    // State for Friends
    const [friends, setFriends] = useState<any[]>([]);
    const [friendInput, setFriendInput] = useState('');

    // State for Groups
    const [groups, setGroups] = useState<any[]>([]);

    // Group Creation State
    const [newGroupData, setNewGroupData] = useState({ name: '', topic: '', isPrivate: false });

    // Notifications
    const [notifications, setNotifications] = useState<{ id: number, text: string }[]>([]);

    useEffect(() => {
        fetchFriends();
        fetchGroups();
        fetchLeaderboard();
    }, []);

    const fetchLeaderboard = async () => {
        try {
            const res = await fetch('/api/leaderboard');
            const data = await res.json();
            if (data.leaderboard) setLeaderboard(data.leaderboard);
        } catch (error) {
            console.error("Failed to fetch leaderboard", error);
        }
    };

    const fetchFriends = async () => {
        try {
            const res = await fetch('/api/friends');
            const data = await res.json();
            if (data.friends) setFriends(data.friends);
        } catch (error) {
            console.error("Failed to fetch friends", error);
        }
    };

    const fetchGroups = async () => {
        try {
            const res = await fetch('/api/groups');
            const data = await res.json();
            if (data.groups) setGroups(data.groups);
        } catch (error) {
            console.error("Failed to fetch groups", error);
        }
    };

    const addNotification = (text: string) => {
        const id = Date.now();
        setNotifications(prev => [...prev, { id, text }]);
        setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== id));
        }, 3000);
    };

    const handleAddFriend = async () => {
        if (!friendInput.trim()) return;

        try {
            const res = await fetch('/api/friends', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: friendInput }),
            });
            const data = await res.json();

            if (res.ok) {
                addNotification(`Friend added: ${data.friend.name}!`);
                setFriendInput('');
                fetchFriends();
            } else {
                addNotification(data.error || "Failed to add friend");
            }
        } catch (error) {
            addNotification("Error adding friend");
        }
    };

    const handleCreateGroup = async () => {
        if (!newGroupData.name.trim()) return;

        try {
            const res = await fetch('/api/groups', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newGroupData),
            });
            const data = await res.json();

            if (res.ok) {
                addNotification(`Group "${data.group.name}" created!`);
                setNewGroupData({ name: '', topic: '', isPrivate: false });
                setShowGroupModal(false);
                fetchGroups();
            } else {
                addNotification(data.error || "Failed to create group");
            }
        } catch (error) {
            addNotification("Error creating group");
        }
    };

    const handleJoinGroup = async (groupId: number) => {
        try {
            const res = await fetch('/api/groups/join', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ groupId }),
            });
            const data = await res.json();

            if (res.ok) {
                addNotification("Joined group successfully!");
                fetchGroups();
            } else {
                addNotification(data.error || "Failed to join group");
            }
        } catch (error) {
            addNotification("Error joining group");
        }
    };

    const handleUpdateGroup = (groupId: number, updates: any) => {
        // Placeholder for update logic if needed later
        setShowManageModal(null);
        addNotification("Group settings updated successfully!");
    };

    return (
        <PageTransition className="container" style={{ position: 'relative' }}>
            {/* Notifications Toast */}
            <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 100, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <AnimatePresence>
                    {notifications.map(n => (
                        <motion.div
                            key={n.id}
                            initial={{ opacity: 0, y: 20, x: 20 }}
                            animate={{ opacity: 1, y: 0, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            style={{
                                padding: '1rem',
                                backgroundColor: '#10b981',
                                color: 'white',
                                borderRadius: '0.5rem',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                fontWeight: '500'
                            }}
                        >
                            <Bell size={16} /> {n.text}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <header className="page-header" style={{ marginBottom: '2rem' }}>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                    <h1 className="page-title" style={{ marginBottom: '0.5rem' }}>Community Hub</h1>
                    <p className="page-subtitle">Connect with peers, join groups, and compete.</p>
                </motion.div>
            </header>

            <div className="tabs-container" style={{ marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`filter-btn ${activeTab === 'leaderboard' ? 'active' : ''}`}
                    onClick={() => setActiveTab('leaderboard')}
                >
                    <Trophy size={18} /> Leaderboard
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`filter-btn ${activeTab === 'friends' ? 'active' : ''}`}
                    onClick={() => setActiveTab('friends')}
                >
                    <Users size={18} /> Friends & Groups
                </motion.button>
            </div>

            <div className="grid-1">
                <AnimatePresence mode="wait">
                    {activeTab === 'leaderboard' ? (
                        <motion.div
                            key="leaderboard"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                            className="card"
                        >
                            {/* Leaderboard Content */}
                            <div className="card-header" style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)' }}>
                                <h2 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Trophy className="text-primary" /> Global Rankings
                                </h2>
                            </div>
                            <div className="card-content" style={{ padding: '0' }}>
                                {leaderboard.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            padding: '1rem 1.5rem',
                                            borderBottom: index !== leaderboard.length - 1 ? '1px solid var(--border)' : 'none',
                                            backgroundColor: item.name === user?.username ? 'rgba(99, 102, 241, 0.05)' : 'transparent'
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <span style={{ fontWeight: '800', color: index < 3 ? 'var(--primary)' : 'var(--text-secondary)', width: '24px' }}>#{item.rank}</span>
                                            <span style={{ fontSize: '1.5rem' }}>{item.avatar}</span>
                                            <span style={{ fontWeight: '600', color: 'var(--foreground)' }}>
                                                {item.name} {item.name === user?.username && "(You)"}
                                            </span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: '700' }}>
                                            <Star size={16} fill="currentColor" />
                                            {item.xp.toLocaleString()} XP
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="friends"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            style={{ display: 'grid', gap: '1.5rem' }}
                        >
                            {/* Actions Bar */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem' }}>
                                <div style={{
                                    padding: '0.75rem',
                                    display: 'flex',
                                    gap: '0.75rem',
                                    alignItems: 'center',
                                    border: '1px solid var(--border)',
                                    borderRadius: '1rem',
                                    backgroundColor: 'white',
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                                }}>
                                    <div className="input-group" style={{ flex: 1 }}>
                                        <input
                                            type="text"
                                            placeholder="Enter Username#Tag..."
                                            value={friendInput}
                                            onChange={(e) => setFriendInput(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleAddFriend()}
                                            style={{
                                                width: '100%',
                                                padding: '0.75rem 1rem',
                                                borderRadius: '0.75rem',
                                                border: '2px solid #e2e8f0',
                                                backgroundColor: '#f8fafc',
                                                fontSize: '0.95rem',
                                                outline: 'none',
                                                transition: 'all 0.2s',
                                                color: 'var(--foreground)'
                                            }}
                                            onFocus={(e) => {
                                                e.target.style.borderColor = 'var(--primary)';
                                                e.target.style.backgroundColor = 'white';
                                            }}
                                            onBlur={(e) => {
                                                e.target.style.borderColor = '#e2e8f0';
                                                e.target.style.backgroundColor = '#f8fafc';
                                            }}
                                        />
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="btn-primary"
                                        onClick={handleAddFriend}
                                        style={{ padding: '0.75rem 1.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center', borderRadius: '0.75rem' }}
                                    >
                                        <UserPlus size={18} /> Add
                                    </motion.button>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="btn-primary"
                                    style={{ padding: '0.75rem 1.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center', backgroundColor: '#10b981', borderRadius: '0.75rem' }}
                                    onClick={() => setShowGroupModal(true)}
                                >
                                    <Users size={18} /> Create Group
                                </motion.button>
                            </div>

                            {/* Join by Code */}
                            <div style={{ padding: '1rem', backgroundColor: 'white', borderRadius: '1rem', border: '1px solid var(--border)', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <div style={{ flex: 1 }}>
                                    <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--foreground)', marginBottom: '0.2rem' }}>Have an Invite Code?</h4>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Enter the code shared by your friend to join their private group.</p>
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <input
                                        type="text"
                                        placeholder="Enter Code (e.g. X7Y2Z9)"
                                        id="invite-code-input"
                                        style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--border)', width: '180px', textTransform: 'uppercase', fontWeight: 'bold' }}
                                    />
                                    <button
                                        className="btn-primary"
                                        style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', borderRadius: '0.5rem' }}
                                        onClick={async () => {
                                            const input = document.getElementById('invite-code-input') as HTMLInputElement;
                                            const code = input.value.trim();
                                            if (!code) return;

                                            try {
                                                const res = await fetch('/api/groups/join', {
                                                    method: 'POST',
                                                    headers: { 'Content-Type': 'application/json' },
                                                    body: JSON.stringify({ inviteCode: code }),
                                                });
                                                const data = await res.json();
                                                if (res.ok) {
                                                    addNotification("Joined group via code!");
                                                    input.value = "";
                                                    fetchGroups();
                                                } else {
                                                    addNotification(data.error || "Failed to join");
                                                }
                                            } catch (e) {
                                                addNotification("Error joining group");
                                            }
                                        }}
                                    >
                                        Join
                                    </button>
                                </div>
                            </div>

                            {/* Groups List */}
                            {groups.length > 0 && (
                                <motion.div
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="show"
                                    style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}
                                >
                                    {groups.map(group => (
                                        <motion.div
                                            key={group.id}
                                            variants={itemVariants}
                                            whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                                            style={{
                                                padding: '1.25rem',
                                                backgroundColor: 'white',
                                                borderRadius: '1rem',
                                                border: '1px solid var(--border)',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '1rem',
                                                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                                                transition: 'box-shadow 0.2s'
                                            }}
                                        >
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                <div>
                                                    <h4 style={{ fontWeight: '700', color: 'var(--foreground)', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                        {group.name}
                                                        {group.isPrivate ? <Lock size={14} color="#64748b" /> : <Globe size={14} color="#64748b" />}
                                                    </h4>
                                                    <p style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: '600' }}>{group.topic}</p>
                                                </div>
                                                {group.host_id === user?.id && (
                                                    <button
                                                        onClick={() => setShowManageModal(group.id)}
                                                        style={{ padding: '0.4rem', borderRadius: '0.4rem', color: '#64748b', cursor: 'pointer' }}
                                                        title="Manage Group"
                                                    >
                                                        <Settings size={18} />
                                                    </button>
                                                )}
                                            </div>

                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                                                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{group.members} Members</span>
                                                {group.host_id === user?.id ? (
                                                    <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#10b981', backgroundColor: '#ecfdf5', padding: '0.25rem 0.75rem', borderRadius: '99px' }}>
                                                        HOST
                                                    </span>
                                                ) : (
                                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                        {user?.role === 'admin' && (
                                                            <button
                                                                onClick={async () => {
                                                                    if (!confirm("Are you sure you want to delete this group? This action cannot be undone.")) return;
                                                                    try {
                                                                        const res = await fetch('/api/groups/delete', {
                                                                            method: 'POST',
                                                                            headers: { 'Content-Type': 'application/json' },
                                                                            body: JSON.stringify({ groupId: group.id }),
                                                                        });
                                                                        if (res.ok) {
                                                                            addNotification("Group deleted by Admin");
                                                                            fetchGroups();
                                                                        } else {
                                                                            addNotification("Failed to delete group");
                                                                        }
                                                                    } catch (e) {
                                                                        addNotification("Error deleting group");
                                                                    }
                                                                }}
                                                                style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', borderRadius: '0.5rem', backgroundColor: '#ef4444', color: 'white', border: 'none', cursor: 'pointer' }}
                                                            >
                                                                Delete
                                                            </button>
                                                        )}
                                                        <motion.button
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                            className="btn-primary"
                                                            style={{ padding: '0.4rem 1rem', fontSize: '0.8rem', borderRadius: '0.5rem' }}
                                                            onClick={() => handleJoinGroup(group.id)}
                                                        >
                                                            Join
                                                        </motion.button>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            )}

                            {/* Friends List */}
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="show"
                                className="grid-2"
                            >
                                {friends.map((friend) => (
                                    <motion.div
                                        key={friend.id}
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.02 }}
                                        style={{
                                            padding: '1rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            gap: '1rem',
                                            backgroundColor: 'white',
                                            borderRadius: '1rem',
                                            border: '1px solid var(--border)',
                                            boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <div style={{ fontSize: '2rem', lineHeight: 1 }}>👤</div>
                                            <div>
                                                <h3 style={{ fontWeight: '700', color: 'var(--foreground)', fontSize: '1rem', margin: 0 }}>
                                                    {friend.name}
                                                </h3>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', color: '#10b981', marginTop: '0.2rem' }}>
                                                    <Circle size={6} fill="currentColor" />
                                                    Online
                                                </div>
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <div style={{ textAlign: 'center' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: '#f59e0b', fontWeight: '700', fontSize: '1rem' }}>
                                                    <Flame size={14} fill="currentColor" />
                                                    {friend.streak || 0}
                                                </div>
                                                <span style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Streak</span>
                                            </div>

                                            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', backgroundColor: 'var(--primary)', opacity: 0.9, borderRadius: '0.5rem' }}>
                                                Challenge
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>

                            {/* Create Group Modal */}
                            {showGroupModal && (
                                <div style={{
                                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                                    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50
                                }}>
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="card"
                                        style={{ padding: '2rem', width: '400px', maxWidth: '90%' }}
                                    >
                                        <h2 className="card-title" style={{ marginBottom: '1.5rem' }}>Create Study Group</h2>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                                            <input
                                                type="text"
                                                placeholder="Group Name"
                                                className="search-input"
                                                value={newGroupData.name}
                                                onChange={(e) => setNewGroupData({ ...newGroupData, name: e.target.value })}
                                                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Topic (e.g. Cardiology)"
                                                className="search-input"
                                                value={newGroupData.topic}
                                                onChange={(e) => setNewGroupData({ ...newGroupData, topic: e.target.value })}
                                                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}
                                            />
                                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                                                <input
                                                    type="checkbox"
                                                    checked={newGroupData.isPrivate}
                                                    onChange={(e) => setNewGroupData({ ...newGroupData, isPrivate: e.target.checked })}
                                                    style={{ width: '1.2rem', height: '1.2rem' }}
                                                />
                                                <span style={{ fontSize: '0.95rem', color: 'var(--foreground)' }}>Private Group (Friends Only)</span>
                                            </label>
                                        </div>

                                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                                            <button className="filter-btn" onClick={() => setShowGroupModal(false)}>Cancel</button>
                                            <button className="btn-primary" onClick={handleCreateGroup}>Create</button>
                                        </div>
                                    </motion.div>
                                </div>
                            )}

                            {/* Manage Group Modal */}
                            {showManageModal && (
                                <div style={{
                                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                                    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50
                                }}>
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="card"
                                        style={{ padding: '2rem', width: '400px', maxWidth: '90%' }}
                                    >
                                        <h2 className="card-title" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <Settings size={24} /> Manage Group
                                        </h2>

                                        {(() => {
                                            const group = groups.find(g => g.id === showManageModal);
                                            if (!group) return null;
                                            return (
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                                                    {/* Invite Code Section */}
                                                    {group.invite_code && (
                                                        <div style={{ padding: '1rem', backgroundColor: '#f0f9ff', borderRadius: '0.5rem', border: '1px solid #bae6fd' }}>
                                                            <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#0284c7', textTransform: 'uppercase', marginBottom: '0.25rem', display: 'block' }}>
                                                                Invite Code (Share with friends)
                                                            </label>
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                                <code style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#0ea5e9', letterSpacing: '1px' }}>
                                                                    {group.invite_code}
                                                                </code>
                                                                <button
                                                                    onClick={() => {
                                                                        navigator.clipboard.writeText(group.invite_code);
                                                                        addNotification("Code copied to clipboard!");
                                                                    }}
                                                                    style={{ fontSize: '0.8rem', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', backgroundColor: 'white', border: '1px solid #e0f2fe', cursor: 'pointer', color: '#0284c7' }}
                                                                >
                                                                    Copy
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}

                                                    <div>
                                                        <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '0.25rem', display: 'block' }}>Group Name</label>
                                                        <input
                                                            type="text"
                                                            defaultValue={group.name}
                                                            id="edit-group-name"
                                                            style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '0.25rem', display: 'block' }}>Current Topic</label>
                                                        <input
                                                            type="text"
                                                            defaultValue={group.topic}
                                                            id="edit-group-topic"
                                                            style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}
                                                        />
                                                    </div>
                                                </div>
                                            );
                                        })()}

                                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                                            <button className="filter-btn" onClick={() => setShowManageModal(null)}>Close</button>
                                            <button
                                                className="btn-primary"
                                                onClick={() => {
                                                    const nameInput = document.getElementById('edit-group-name') as HTMLInputElement;
                                                    const topicInput = document.getElementById('edit-group-topic') as HTMLInputElement;
                                                    handleUpdateGroup(showManageModal, {
                                                        name: nameInput.value,
                                                        topic: topicInput.value
                                                    });
                                                }}
                                            >
                                                Save Changes
                                            </button>
                                        </div>
                                    </motion.div>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </PageTransition>
    );
}

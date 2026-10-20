import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView, 
  Image, 
  Linking 
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Mobile Native interface for Dubai Friends App
export default function App() {
  const [activeTab, setActiveTab] = useState<'discover' | 'events' | 'jobs' | 'chat'>('discover');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'kerala' | 'ai'>('all');

  const users = [
    {
      id: '1',
      name: 'Rahul Menon',
      role: 'AI & Robotics Student',
      region: 'Kerala (Malayali)',
      area: 'Dubai Academic City',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300',
      bio: 'Malayali AI student looking to meet fellow builders & study groups in Dubai.'
    },
    {
      id: '2',
      name: 'Ananya Sharma',
      role: 'Finance Graduate / Job Seeker',
      region: 'North India',
      area: 'Business Bay',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=300',
      bio: 'New in Dubai! Excited to connect for GITEX Career Expo.'
    },
    {
      id: '3',
      name: 'Sneha Nair',
      role: 'BBA 2nd Year',
      region: 'Kerala (Malayali)',
      area: 'Al Barsha',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300',
      bio: 'Wollongong University student. Loves photography and food walks in Deira.'
    }
  ];

  const events = [
    {
      id: 'e1',
      title: 'GITEX Career Fair & Tech Talent Expo 2026',
      date: 'Sun, Oct 25 • 10:00 AM',
      venue: 'Dubai World Trade Centre (DWTC)',
      badge: '💼 Job Fair',
      going: 248
    },
    {
      id: 'e2',
      title: 'Malayali Students & Newcomers Meetup',
      date: 'Wed, Oct 28 • 04:00 PM',
      venue: 'Zabeel Park (Near Dubai Frame)',
      badge: '🌴 Community',
      going: 89
    }
  ];

  const jobs = [
    {
      id: 'j1',
      title: 'Junior Fullstack Engineer',
      company: 'Careem Technologies',
      area: 'Dubai Internet City',
      salary: 'AED 9,000 - 13,000',
      url: 'https://www.linkedin.com/jobs/search/?keywords=Careem%20Junior%20Engineer'
    },
    {
      id: 'j2',
      title: 'AI / Machine Learning Student Intern',
      company: 'TII Dubai',
      area: 'Dubai Silicon Oasis',
      salary: 'AED 4,500 stipend',
      url: 'https://www.linkedin.com/jobs/search/?keywords=AI%20Intern%20Dubai'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {/* Mobile Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.logoTitle}>Dubai<Text style={styles.goldText}>Friends</Text></Text>
          <Text style={styles.subTitle}>18+ Verified Dubai Community 🇦🇪</Text>
        </View>
        <TouchableOpacity style={styles.profileBadge}>
          <Text style={styles.profileBadgeText}>Meenakshi</Text>
        </TouchableOpacity>
      </View>

      {/* Main Tab Content */}
      <ScrollView style={styles.content}>
        {activeTab === 'discover' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Find Friends in Dubai</Text>
            <Text style={styles.sectionDesc}>Connect with Malayalis, AI students & peers</Text>

            {/* Filter Pills */}
            <View style={styles.filterRow}>
              <TouchableOpacity 
                style={[styles.filterPill, selectedFilter === 'all' && styles.filterPillActive]}
                onPress={() => setSelectedFilter('all')}
              >
                <Text style={[styles.filterPillText, selectedFilter === 'all' && styles.filterPillTextActive]}>All</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.filterPill, selectedFilter === 'kerala' && styles.filterPillActive]}
                onPress={() => setSelectedFilter('kerala')}
              >
                <Text style={[styles.filterPillText, selectedFilter === 'kerala' && styles.filterPillTextActive]}>🌴 Malayalis</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.filterPill, selectedFilter === 'ai' && styles.filterPillActive]}
                onPress={() => setSelectedFilter('ai')}
              >
                <Text style={[styles.filterPillText, selectedFilter === 'ai' && styles.filterPillTextActive]}>🤖 AI Students</Text>
              </TouchableOpacity>
            </View>

            {/* User Cards */}
            {users.map((u) => (
              <View key={u.id} style={styles.card}>
                <View style={styles.cardHeader}>
                  <Image source={{ uri: u.avatar }} style={styles.avatar} />
                  <View style={styles.cardInfo}>
                    <Text style={styles.userName}>{u.name}</Text>
                    <Text style={styles.userRole}>{u.role}</Text>
                    <Text style={styles.userArea}>📍 {u.area} • {u.region}</Text>
                  </View>
                </View>
                <Text style={styles.bioText}>{u.bio}</Text>
                <TouchableOpacity style={styles.connectButton}>
                  <Text style={styles.connectButtonText}>Connect +</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'events' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Dubai Events & Job Fairs</Text>
            <Text style={styles.sectionDesc}>RSVP and attend together in a group</Text>

            {events.map((e) => (
              <View key={e.id} style={styles.card}>
                <View style={styles.eventBadgeRow}>
                  <Text style={styles.eventBadge}>{e.badge}</Text>
                  <Text style={styles.goingText}>👥 {e.going} going</Text>
                </View>
                <Text style={styles.eventTitle}>{e.title}</Text>
                <Text style={styles.eventDetails}>📅 {e.date}</Text>
                <Text style={styles.eventDetails}>📍 {e.venue}</Text>

                <TouchableOpacity style={styles.rsvpButton}>
                  <Text style={styles.rsvpButtonText}>RSVP (Attend as Group)</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'jobs' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Verified Job Postings</Text>
            <Text style={styles.sectionDesc}>Direct LinkedIn job applications in Dubai</Text>

            {jobs.map((j) => (
              <View key={j.id} style={styles.card}>
                <Text style={styles.jobTitle}>{j.title}</Text>
                <Text style={styles.companyName}>🏢 {j.company}</Text>
                <Text style={styles.jobDetails}>📍 {j.area} • 💰 {j.salary}</Text>

                <TouchableOpacity 
                  style={styles.linkedInButton}
                  onPress={() => Linking.openURL(j.url)}
                >
                  <Text style={styles.linkedInButtonText}>Apply on LinkedIn ↗</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'chat' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Community Conversations</Text>
            <Text style={styles.sectionDesc}>Your connected friends and event groups</Text>

            <View style={styles.card}>
              <Text style={styles.chatGroupTitle}>GITEX Career Fair - Group Meetup 🚀</Text>
              <Text style={styles.lastMessage}>Meenakshi: Let us meet near DWTC Metro Exit 2 at 9:30 AM!</Text>
              <TouchableOpacity style={styles.openChatButton}>
                <Text style={styles.openChatButtonText}>Open Chat Room</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.card}>
              <Text style={styles.chatGroupTitle}>Rahul Menon (AI Student)</Text>
              <Text style={styles.lastMessage}>Rahul: There is a group of Malayali students meeting at DWTC.</Text>
              <TouchableOpacity style={styles.openChatButton}>
                <Text style={styles.openChatButtonText}>Open Direct Message</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Bottom Tabs Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => setActiveTab('discover')}
        >
          <Text style={[styles.navIcon, activeTab === 'discover' && styles.navIconActive]}>🔍</Text>
          <Text style={[styles.navText, activeTab === 'discover' && styles.navTextActive]}>Friends</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => setActiveTab('events')}
        >
          <Text style={[styles.navIcon, activeTab === 'events' && styles.navIconActive]}>🗺️</Text>
          <Text style={[styles.navText, activeTab === 'events' && styles.navTextActive]}>Events</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => setActiveTab('jobs')}
        >
          <Text style={[styles.navIcon, activeTab === 'jobs' && styles.navIconActive]}>💼</Text>
          <Text style={[styles.navText, activeTab === 'jobs' && styles.navTextActive]}>Jobs</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => setActiveTab('chat')}
        >
          <Text style={[styles.navIcon, activeTab === 'chat' && styles.navIconActive]}>💬</Text>
          <Text style={[styles.navText, activeTab === 'chat' && styles.navTextActive]}>Chat</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC'
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF'
  },
  logoTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A'
  },
  goldText: {
    color: '#D97706'
  },
  subTitle: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '600'
  },
  profileBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20
  },
  profileBadgeText: {
    color: '#B45309',
    fontSize: 11,
    fontWeight: '700'
  },
  content: {
    flex: 1,
    padding: 16
  },
  section: {
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A'
  },
  sectionDesc: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 12
  },
  filterRow: {
    flexDirection: 'row',
    marginBottom: 14,
    gap: 8
  },
  filterPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1'
  },
  filterPillActive: {
    backgroundColor: '#D97706',
    borderColor: '#D97706'
  },
  filterPillText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#475569'
  },
  filterPillTextActive: {
    color: '#FFFFFF'
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 5,
    elevation: 2
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12
  },
  cardInfo: {
    flex: 1
  },
  userName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A'
  },
  userRole: {
    fontSize: 12,
    fontWeight: '600',
    color: '#B45309'
  },
  userArea: {
    fontSize: 11,
    color: '#64748B'
  },
  bioText: {
    fontSize: 12,
    color: '#475569',
    marginTop: 8,
    lineHeight: 18
  },
  connectButton: {
    marginTop: 10,
    backgroundColor: '#D97706',
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: 'center'
  },
  connectButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700'
  },
  eventBadgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4
  },
  eventBadge: {
    fontSize: 11,
    fontWeight: '700',
    color: '#059669',
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6
  },
  goingText: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600'
  },
  eventTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4
  },
  eventDetails: {
    fontSize: 11,
    color: '#475569',
    marginBottom: 2
  },
  rsvpButton: {
    marginTop: 10,
    backgroundColor: '#0F172A',
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: 'center'
  },
  rsvpButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700'
  },
  jobTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A'
  },
  companyName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
    marginTop: 2
  },
  jobDetails: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
    marginBottom: 8
  },
  linkedInButton: {
    backgroundColor: '#0A66C2',
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: 'center'
  },
  linkedInButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700'
  },
  chatGroupTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A'
  },
  lastMessage: {
    fontSize: 12,
    color: '#64748B',
    marginVertical: 4
  },
  openChatButton: {
    backgroundColor: '#FEF3C7',
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 4
  },
  openChatButtonText: {
    color: '#B45309',
    fontSize: 11,
    fontWeight: '700'
  },
  bottomNav: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    justifyContent: 'space-around'
  },
  navItem: {
    alignItems: 'center'
  },
  navIcon: {
    fontSize: 18,
    color: '#94A3B8'
  },
  navIconActive: {
    color: '#D97706'
  },
  navText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#94A3B8',
    marginTop: 2
  },
  navTextActive: {
    color: '#D97706',
    fontWeight: '700'
  }
});

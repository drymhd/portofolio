<script setup>
import { ref, onMounted } from 'vue'
import { 
  Users, MessageSquare, Briefcase, Award, Save, Plus, Trash2, 
  Edit3, CheckCircle, AlertCircle, FileJson, Mail, ChevronRight, X 
} from '@lucide/vue'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update-data'])

const activeSection = ref('overview') // 'overview', 'profile', 'projects', 'skills', 'inbox', 'json'
const messages = ref([])

// Form states
const profileForm = ref({ ...props.data.personal })

// Project CRUD states
const projectForm = ref({
  id: '',
  title: '',
  description: '',
  category: 'Web',
  tags: '',
  image: '',
  link: ''
})
const editingProjectId = ref(null)

// Skills CRUD states
const newSkill = ref({
  categoryIdx: 0,
  name: '',
  level: 80
})

// Inbox/Message states
const replyingMessage = ref(null)
const replyText = ref('')
const replySuccess = ref(false)

// Raw JSON states
const rawJsonText = ref(JSON.stringify(props.data, null, 2))
const jsonError = ref('')
const jsonSuccess = ref(false)

// Loading messages
const loadMessages = () => {
  const loaded = localStorage.getItem('dary_portfolio_messages')
  messages.value = loaded ? JSON.parse(loaded) : []
}

onMounted(() => {
  loadMessages()
})

const saveProfile = () => {
  const updatedData = { ...props.data }
  updatedData.personal = { ...profileForm.value }
  emit('update-data', updatedData)
  
  // Show quick success alert
  alert('Profile updated successfully!')
}

// Project CRUD actions
const startEditProject = (proj) => {
  editingProjectId.value = proj.id
  projectForm.value = {
    id: proj.id,
    title: proj.title,
    description: proj.description,
    category: proj.category,
    tags: proj.tags.join(', '),
    image: proj.image,
    link: proj.link
  }
}

const resetProjectForm = () => {
  editingProjectId.value = null
  projectForm.value = {
    id: '',
    title: '',
    description: '',
    category: 'Web',
    tags: '',
    image: '',
    link: ''
  }
}

const saveProject = () => {
  const updatedData = { ...props.data }
  const tagsArray = projectForm.value.tags.split(',').map(t => t.trim()).filter(Boolean)
  
  if (editingProjectId.value) {
    // Edit mode
    updatedData.projects = updatedData.projects.map(p => {
      if (p.id === editingProjectId.value) {
        return {
          ...p,
          title: projectForm.value.title,
          description: projectForm.value.description,
          category: projectForm.value.category,
          tags: tagsArray,
          image: projectForm.value.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600',
          link: projectForm.value.link
        }
      }
      return p
    })
  } else {
    // Add mode
    const newProj = {
      id: Date.now().toString(),
      title: projectForm.value.title,
      description: projectForm.value.description,
      category: projectForm.value.category,
      tags: tagsArray,
      image: projectForm.value.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600',
      link: projectForm.value.link || 'https://github.com/'
    }
    updatedData.projects.push(newProj)
  }
  
  emit('update-data', updatedData)
  resetProjectForm()
}

const deleteProject = (id) => {
  if (confirm('Are you sure you want to delete this project?')) {
    const updatedData = { ...props.data }
    updatedData.projects = updatedData.projects.filter(p => p.id !== id)
    emit('update-data', updatedData)
  }
}

// Skills actions
const addSkill = () => {
  if (!newSkill.value.name.trim()) return
  
  const updatedData = { ...props.data }
  updatedData.skills[newSkill.value.categoryIdx].items.push({
    name: newSkill.value.name,
    level: parseInt(newSkill.value.level)
  })
  
  emit('update-data', updatedData)
  newSkill.value.name = ''
}

const deleteSkill = (catIdx, skillIdx) => {
  const updatedData = { ...props.data }
  updatedData.skills[catIdx].items.splice(skillIdx, 1)
  emit('update-data', updatedData)
}

// Inbox actions
const toggleMessageRead = (msgId) => {
  const updated = messages.value.map(m => {
    if (m.id === msgId) {
      return { ...m, read: !m.read }
    }
    return m
  })
  messages.value = updated
  localStorage.setItem('dary_portfolio_messages', JSON.stringify(updated))
}

const deleteMessage = (msgId) => {
  if (confirm('Delete this message?')) {
    const updated = messages.value.filter(m => m.id !== msgId)
    messages.value = updated
    localStorage.setItem('dary_portfolio_messages', JSON.stringify(updated))
  }
}

const openReplyModal = (msg) => {
  replyingMessage.value = msg
  replyText.value = ''
  replySuccess.value = false
}

const sendReply = () => {
  if (!replyText.value.trim()) return
  
  isReplying.value = true
  setTimeout(() => {
    // Mock response sent
    replySuccess.value = true
    setTimeout(() => {
      // Mark message as read
      const updated = messages.value.map(m => {
        if (m.id === replyingMessage.value.id) {
          return { ...m, read: true }
        }
        return m
      })
      messages.value = updated
      localStorage.setItem('dary_portfolio_messages', JSON.stringify(updated))
      
      replyingMessage.value = null
    }, 1500)
  }, 1000)
}

const isReplying = ref(false)

// Raw JSON direct edits
const saveRawJson = () => {
  try {
    jsonError.value = ''
    jsonSuccess.value = false
    
    const parsed = JSON.parse(rawJsonText.value)
    
    // Quick validation
    if (!parsed.personal || !parsed.projects || !parsed.skills) {
      throw new Error('JSON format is missing required keys (personal, projects, skills)')
    }
    
    emit('update-data', parsed)
    jsonSuccess.value = true
    setTimeout(() => {
      jsonSuccess.value = false
    }, 3000)
  } catch (e) {
    jsonError.value = 'Invalid JSON structure: ' + e.message
  }
}

// Sync rawJsonText when props change
const syncJsonText = () => {
  rawJsonText.value = JSON.stringify(props.data, null, 2)
}
</script>

<template>
  <div class="dashboard-wrapper section-padding">
    <div class="dashboard-container">
      
      <!-- Dashboard Sidebar -->
      <aside class="dashboard-sidebar glass-card">
        <div class="sidebar-header">
          <FileJson :size="20" class="text-accent" />
          <span>Admin Control</span>
        </div>
        <div class="sidebar-menu">
          <button 
            @click="activeSection = 'overview'" 
            :class="['menu-item', { active: activeSection === 'overview' }]"
          >
            <Users :size="16" /> Overview
          </button>
          
          <button 
            @click="activeSection = 'profile'" 
            :class="['menu-item', { active: activeSection === 'profile' }]"
          >
            <Edit3 :size="16" /> Edit Profile
          </button>
          
          <button 
            @click="activeSection = 'projects'" 
            :class="['menu-item', { active: activeSection === 'projects' }]"
          >
            <Briefcase :size="16" /> Projects CRUD
          </button>
          
          <button 
            @click="activeSection = 'skills'" 
            :class="['menu-item', { active: activeSection === 'skills' }]"
          >
            <Award :size="16" /> Skills Manager
          </button>
          
          <button 
            @click="activeSection = 'inbox'" 
            :class="['menu-item', { active: activeSection === 'inbox' }]"
          >
            <MessageSquare :size="16" /> Message Inbox
            <span v-if="messages.filter(m => !m.read).length > 0" class="unread-badge">
              {{ messages.filter(m => !m.read).length }}
            </span>
          </button>
          
          <button 
            @click="activeSection = 'json'; syncJsonText()" 
            :class="['menu-item', { active: activeSection === 'json' }]"
          >
            <FileJson :size="16" /> Raw JSON Schema
          </button>
        </div>
      </aside>

      <!-- Dashboard Main Workspace -->
      <main class="dashboard-workspace glass-card">
        
        <!-- SECTION: OVERVIEW -->
        <div v-if="activeSection === 'overview'" class="workspace-section text-left">
          <h2>Overview Status</h2>
          <p class="section-subtitle">Real-time metrics of your local portfolio instance.</p>
          
          <div class="metrics-grid">
            <div class="metric-card glass-card">
              <div class="metric-info">
                <span class="metric-label">Profile Visitors (Mock)</span>
                <span class="metric-value">1,424</span>
              </div>
              <Users :size="24" class="text-accent" />
            </div>

            <div class="metric-card glass-card">
              <div class="metric-info">
                <span class="metric-label">Total Projects</span>
                <span class="metric-value">{{ data.projects.length }}</span>
              </div>
              <Briefcase :size="24" class="text-accent" />
            </div>

            <div class="metric-card glass-card">
              <div class="metric-info">
                <span class="metric-label">Inbox Messages</span>
                <span class="metric-value">{{ messages.length }}</span>
                <span v-if="messages.filter(m => !m.read).length > 0" class="sub-value text-accent">
                  ({{ messages.filter(m => !m.read).length }} Unread)
                </span>
              </div>
              <MessageSquare :size="24" class="text-accent" />
            </div>
          </div>

          <!-- Activity Chart Mock -->
          <div class="chart-container glass-card">
            <h3>Visitor Activity Graph (Weekly Mock)</h3>
            <div class="mock-chart">
              <div class="chart-bar" style="--height: 40%"><span>Mon</span></div>
              <div class="chart-bar" style="--height: 55%"><span>Tue</span></div>
              <div class="chart-bar" style="--height: 85%"><span>Wed</span></div>
              <div class="chart-bar" style="--height: 60%"><span>Thu</span></div>
              <div class="chart-bar highlight" style="--height: 95%"><span>Fri</span></div>
              <div class="chart-bar" style="--height: 70%"><span>Sat</span></div>
              <div class="chart-bar" style="--height: 50%"><span>Sun</span></div>
            </div>
          </div>
        </div>

        <!-- SECTION: PROFILE CONFIG -->
        <div v-else-if="activeSection === 'profile'" class="workspace-section text-left">
          <h2>Edit Profile Context</h2>
          <p class="section-subtitle">Change bio and information displayed on the home page.</p>
          
          <form @submit.prevent="saveProfile" class="dashboard-form">
            <div class="form-row-2">
              <div class="form-group">
                <label>Name</label>
                <input type="text" v-model="profileForm.name" class="form-input" required />
              </div>
              <div class="form-group">
                <label>Job Title</label>
                <input type="text" v-model="profileForm.title" class="form-input" required />
              </div>
            </div>

            <div class="form-row-2">
              <div class="form-group">
                <label>Email Address</label>
                <input type="email" v-model="profileForm.email" class="form-input" required />
              </div>
              <div class="form-group">
                <label>Phone / WhatsApp</label>
                <input type="text" v-model="profileForm.phone" class="form-input" required />
              </div>
            </div>

            <div class="form-row-2">
              <div class="form-group">
                <label>Location (City)</label>
                <input type="text" v-model="profileForm.location" class="form-input" required />
              </div>
              <div class="form-group">
                <label>LinkedIn Link</label>
                <input type="text" v-model="profileForm.linkedin" class="form-input" />
              </div>
            </div>

            <div class="form-group">
              <label>Hero Summary Bio (Short)</label>
              <textarea v-model="profileForm.bio" rows="2" class="form-input" required></textarea>
            </div>

            <div class="form-group">
              <label>About Paragraph (Long)</label>
              <textarea v-model="profileForm.aboutText" rows="4" class="form-input" required></textarea>
            </div>

            <button type="submit" class="btn-primary">
              <Save :size="16" /> Save Profile Details
            </button>
          </form>
        </div>

        <!-- SECTION: PROJECTS CRUD -->
        <div v-else-if="activeSection === 'projects'" class="workspace-section text-left">
          <h2>Projects CRUD Panel</h2>
          <p class="section-subtitle">Add, edit, or remove entries in the portfolio catalog.</p>
          
          <div class="crud-split">
            <!-- Left: Add/Edit Form -->
            <div class="crud-form-side glass-card">
              <h3>{{ editingProjectId ? 'Edit Project' : 'Add New Project' }}</h3>
              <form @submit.prevent="saveProject" class="dashboard-form">
                <div class="form-group">
                  <label>Project Title *</label>
                  <input type="text" v-model="projectForm.title" class="form-input" placeholder="e.g. Courier Tracker" required />
                </div>

                <div class="form-row-2">
                  <div class="form-group">
                    <label>Category</label>
                    <select v-model="projectForm.category" class="form-input">
                      <option value="Web">Web App</option>
                      <option value="Mobile">Mobile App</option>
                      <option value="API">Backend / API</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label>Demo Link</label>
                    <input type="text" v-model="projectForm.link" class="form-input" placeholder="GitHub URL" />
                  </div>
                </div>

                <div class="form-group">
                  <label>Tech Tags (Comma separated) *</label>
                  <input type="text" v-model="projectForm.tags" class="form-input" placeholder="Vue, Node.js, Express" required />
                </div>

                <div class="form-group">
                  <label>Cover Image URL</label>
                  <input type="text" v-model="projectForm.image" class="form-input" placeholder="https://unsplash..." />
                </div>

                <div class="form-group">
                  <label>Description *</label>
                  <textarea v-model="projectForm.description" rows="3" class="form-input" placeholder="Describe what the application does..." required></textarea>
                </div>

                <div class="crud-actions">
                  <button type="submit" class="btn-primary">
                    <Plus v-if="!editingProjectId" :size="16" />
                    <Save v-else :size="16" />
                    {{ editingProjectId ? 'Update Project' : 'Add Project' }}
                  </button>
                  <button 
                    v-if="editingProjectId" 
                    type="button" 
                    @click="resetProjectForm" 
                    class="btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>

            <!-- Right: List with actions -->
            <div class="crud-list-side">
              <h3>Active Project Entries</h3>
              <div class="projects-list-scroll">
                <div v-for="proj in data.projects" :key="proj.id" class="list-item-card glass-card">
                  <div class="list-item-info">
                    <span class="badge text-accent">{{ proj.category }}</span>
                    <h4>{{ proj.title }}</h4>
                    <p>{{ proj.description.substring(0, 70) }}...</p>
                  </div>
                  <div class="list-item-actions">
                    <button @click="startEditProject(proj)" class="action-btn edit" title="Edit">
                      <Edit3 :size="14" />
                    </button>
                    <button @click="deleteProject(proj.id)" class="action-btn delete" title="Delete">
                      <Trash2 :size="14" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- SECTION: SKILLS MANAGER -->
        <div v-else-if="activeSection === 'skills'" class="workspace-section text-left">
          <h2>Skills Manager</h2>
          <p class="section-subtitle">Maintain your technical toolkit categories and progress ratings.</p>
          
          <div class="crud-split">
            <!-- Left: Add Skill Form -->
            <div class="crud-form-side glass-card">
              <h3>Add Skill</h3>
              <form @submit.prevent="addSkill" class="dashboard-form">
                <div class="form-group">
                  <label>Category Group</label>
                  <select v-model="newSkill.categoryIdx" class="form-input">
                    <option v-for="(cat, idx) in data.skills" :key="idx" :value="idx">
                      {{ cat.category }}
                    </option>
                  </select>
                </div>

                <div class="form-group">
                  <label>Skill Name</label>
                  <input type="text" v-model="newSkill.name" placeholder="e.g. TypeScript" class="form-input" required />
                </div>

                <div class="form-group">
                  <label>Proficiency Level ({{ newSkill.level }}%)</label>
                  <input type="range" min="10" max="100" v-model="newSkill.level" class="form-range" />
                </div>

                <button type="submit" class="btn-primary">
                  <Plus :size="16" /> Add Skill Tag
                </button>
              </form>
            </div>

            <!-- Right: List by Category -->
            <div class="crud-list-side">
              <h3>Active Skills</h3>
              <div class="skills-manager-scroll">
                <div v-for="(cat, cIdx) in data.skills" :key="cIdx" class="skills-category-group">
                  <h4>{{ cat.category }}</h4>
                  <div class="manager-skills-list">
                    <span v-for="(skill, sIdx) in cat.items" :key="sIdx" class="manager-skill-badge badge">
                      {{ skill.name }} ({{ skill.level }}%)
                      <button @click="deleteSkill(cIdx, sIdx)" class="delete-skill-tag" title="Remove">
                        <X :size="12" />
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- SECTION: INBOX -->
        <div v-else-if="activeSection === 'inbox'" class="workspace-section text-left">
          <h2>Message Inbox</h2>
          <p class="section-subtitle">Review submission logs generated via the public contact forms.</p>
          
          <div class="inbox-layout" v-if="messages.length > 0">
            <!-- Messages List -->
            <div class="messages-list">
              <div 
                v-for="msg in messages" 
                :key="msg.id" 
                :class="['msg-card', 'glass-card', { 'msg-unread': !msg.read }]"
              >
                <div class="msg-card-header">
                  <span class="msg-sender">{{ msg.name }}</span>
                  <span class="msg-date">{{ msg.date }}</span>
                </div>
                <div class="msg-subject">{{ msg.subject }}</div>
                <p class="msg-body">{{ msg.message }}</p>
                <div class="msg-meta">
                  <span class="msg-email"><Mail :size="12" /> {{ msg.email }}</span>
                  <div class="msg-actions">
                    <button 
                      @click="toggleMessageRead(msg.id)" 
                      class="msg-action-btn"
                      :title="msg.read ? 'Mark as Unread' : 'Mark as Read'"
                    >
                      <CheckCircle :size="14" :class="{ 'text-accent': msg.read }" />
                    </button>
                    <button @click="openReplyModal(msg)" class="msg-action-btn reply" title="Reply (Mock)">
                      <ChevronRight :size="14" /> Reply
                    </button>
                    <button @click="deleteMessage(msg.id)" class="msg-action-btn delete" title="Delete">
                      <Trash2 :size="14" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="empty-inbox glass-card">
            <MessageSquare :size="48" class="text-muted" />
            <p>Your inbox is empty. Contact submissions will appear here!</p>
          </div>
        </div>

        <!-- SECTION: RAW JSON DIRECT EDIT -->
        <div v-else-if="activeSection === 'json'" class="workspace-section text-left">
          <h2>Raw JSON Configuration</h2>
          <p class="section-subtitle">Read and update your profile details using raw JSON. Export or copy-paste your database state directly.</p>
          
          <div class="json-editor-container">
            <textarea 
              v-model="rawJsonText" 
              class="json-textarea" 
              spellcheck="false"
              rows="20"
            ></textarea>
            
            <div class="json-actions">
              <button @click="saveRawJson" class="btn-primary">
                <Save :size="16" /> Validate & Apply Config
              </button>
              
              <transition name="status-fade">
                <div v-if="jsonSuccess" class="json-status success">
                  <CheckCircle :size="16" /> Verified & Saved!
                </div>
                <div v-else-if="jsonError" class="json-status error">
                  <AlertCircle :size="16" /> {{ jsonError }}
                </div>
              </transition>
            </div>
          </div>
        </div>

      </main>
    </div>

    <!-- MOCK REPLY MODAL -->
    <transition name="fade">
      <div v-if="replyingMessage" class="modal-overlay">
        <div class="reply-modal glass-card">
          <div class="modal-header">
            <h3>Reply to {{ replyingMessage.name }}</h3>
            <button @click="replyingMessage = null" class="close-btn"><X :size="18" /></button>
          </div>
          <div class="modal-body">
            <div class="original-msg">
              <strong>Original Message:</strong>
              <p>"{{ replyingMessage.message }}"</p>
            </div>
            
            <div class="form-group text-left">
              <label>Your Response (Mock email dispatch)</label>
              <textarea 
                v-model="replyText" 
                rows="5" 
                placeholder="Hi, thanks for reaching out..."
                class="form-input"
              ></textarea>
            </div>

            <div class="modal-footer">
              <button 
                @click="sendReply" 
                class="btn-primary"
                :disabled="isReplying || !replyText.trim()"
              >
                <span v-if="!isReplying">Send Email Reply</span>
                <span v-else>Simulating SMTP Send...</span>
              </button>
              
              <div v-if="replySuccess" class="reply-success-alert text-accent">
                <CheckCircle :size="16" /> Response successfully simulated!
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>

<style scoped>
.dashboard-wrapper {
  background: var(--bg-dark);
  min-height: 100vh;
  padding-top: 120px;
}

.dashboard-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 30px;
  align-items: start;
}

/* Sidebar Styling */
.dashboard-sidebar {
  padding: 24px;
  border: 1px solid var(--border-glass);
}

.sidebar-header {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 16px;
  color: #fff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding-bottom: 16px;
  margin-bottom: 20px;
}

.sidebar-menu {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  background: transparent;
  border: none;
  color: var(--text-secondary);
  padding: 12px 16px;
  border-radius: 8px;
  font-family: var(--font-sans);
  font-weight: 500;
  font-size: 14.5px;
  cursor: pointer;
  width: 100%;
  text-align: left;
  transition: var(--transition);
}

.menu-item:hover {
  background: rgba(255, 255, 255, 0.02);
  color: #fff;
}

.menu-item.active {
  background: rgba(181, 255, 43, 0.1);
  color: var(--accent);
  font-weight: 600;
}

.unread-badge {
  background: var(--accent);
  color: var(--bg-dark);
  font-size: 11px;
  font-weight: 800;
  padding: 2px 8px;
  border-radius: 999px;
  margin-left: auto;
  box-shadow: 0 0 8px rgba(181, 255, 43, 0.4);
}

/* Workspace Styling */
.dashboard-workspace {
  padding: 40px;
  border: 1px solid var(--border-glass);
  min-height: 550px;
}

.workspace-section h2 {
  font-size: 28px;
  color: #fff;
  margin-bottom: 4px;
}

.section-subtitle {
  font-size: 14px;
  color: var(--text-muted);
  margin-bottom: 30px;
}

/* Overview Section Metrics */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 40px;
}

.metric-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border: 1px solid var(--border-glass);
}

.metric-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.metric-label {
  font-size: 13px;
  color: var(--text-muted);
  font-weight: 600;
  margin-bottom: 4px;
}

.metric-value {
  font-size: 32px;
  font-family: var(--font-heading);
  font-weight: 800;
  color: #fff;
  line-height: 1;
}

.sub-value {
  font-size: 12px;
  font-weight: 600;
  margin-top: 4px;
}

/* Chart Widget styling */
.chart-container {
  padding: 30px;
  border: 1px solid var(--border-glass);
}

.chart-container h3 {
  font-size: 16px;
  color: #fff;
  margin-bottom: 30px;
}

.mock-chart {
  display: flex;
  height: 200px;
  align-items: flex-end;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding: 0 10px;
}

.chart-bar {
  flex: 1;
  background: rgba(255, 255, 255, 0.03);
  margin: 0 8px;
  height: var(--height);
  border-radius: 4px 4px 0 0;
  position: relative;
  transition: var(--transition);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.chart-bar.highlight {
  background: rgba(181, 255, 43, 0.15);
  border-color: rgba(181, 255, 43, 0.3);
}

.chart-bar:hover {
  background: var(--accent);
  box-shadow: var(--shadow-neon);
}

.chart-bar span {
  position: absolute;
  bottom: -28px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 11px;
  color: var(--text-muted);
}

/* Forms */
.dashboard-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-row-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-secondary);
}

.form-input {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 12px 16px;
  color: #fff;
  font-family: var(--font-sans);
  font-size: 14px;
  width: 100%;
}

.form-input:focus {
  outline: none;
  border-color: var(--accent);
  background: rgba(181, 255, 43, 0.01);
}

.form-range {
  accent-color: var(--accent);
  width: 100%;
  margin-top: 10px;
}

/* CRUD Split Panels */
.crud-split {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 30px;
}

.crud-form-side {
  padding: 24px;
  border: 1px solid var(--border-glass);
}

.crud-form-side h3,
.crud-list-side h3 {
  font-size: 18px;
  color: #fff;
  margin-bottom: 20px;
}

.crud-actions {
  display: flex;
  gap: 12px;
  margin-top: 10px;
}

.projects-list-scroll {
  display: flex;
  flex-direction: column;
  gap: 14px;
  max-height: 420px;
  overflow-y: auto;
  padding-right: 6px;
}

.list-item-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border: 1px solid var(--border-glass);
}

.list-item-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 80%;
}

.list-item-info h4 {
  font-size: 16px;
  color: #fff;
  margin-top: 4px;
  margin-bottom: 2px;
}

.list-item-info p {
  font-size: 12px;
  color: var(--text-muted);
}

.list-item-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  width: 34px;
  height: 34px;
  border-radius: 8px;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition);
}

.action-btn.edit:hover {
  background: rgba(181, 255, 43, 0.1);
  border-color: var(--accent);
  color: var(--accent);
}

.action-btn.delete:hover {
  background: rgba(239, 68, 68, 0.1);
  border-color: #ef4444;
  color: #ef4444;
}

/* Skills category scroll */
.skills-manager-scroll {
  max-height: 450px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-right: 6px;
}

.skills-category-group h4 {
  font-size: 14px;
  color: var(--accent);
  margin-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
  padding-bottom: 4px;
}

.manager-skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.manager-skill-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
}

.delete-skill-tag {
  background: transparent;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
}

.delete-skill-tag:hover {
  color: #ef4444;
}

/* Inbox manager */
.empty-inbox {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px;
  border: 1px solid var(--border-glass);
}

.empty-inbox p {
  margin-top: 16px;
  color: var(--text-muted);
  font-size: 14.5px;
}

.inbox-layout {
  max-height: 480px;
  overflow-y: auto;
  padding-right: 6px;
}

.messages-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.msg-card {
  padding: 24px;
  border: 1px solid var(--border-glass);
}

.msg-unread {
  border-left: 3px solid var(--accent);
  background: rgba(181, 255, 43, 0.02);
}

.msg-card-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
}

.msg-sender {
  font-weight: 700;
  color: #fff;
  font-size: 15px;
}

.msg-date {
  font-size: 11px;
  color: var(--text-muted);
}

.msg-subject {
  font-size: 13.5px;
  color: var(--accent);
  margin-bottom: 12px;
  font-weight: 500;
}

.msg-body {
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-secondary);
  margin-bottom: 16px;
  border-left: 2px solid rgba(255, 255, 255, 0.03);
  padding-left: 12px;
}

.msg-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.msg-email {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--text-muted);
}

.msg-actions {
  display: flex;
  gap: 10px;
}

.msg-action-btn {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 12px;
  color: var(--text-secondary);
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.msg-action-btn:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
}

.msg-action-btn.reply:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.msg-action-btn.delete:hover {
  border-color: #ef4444;
  color: #ef4444;
}

/* Raw JSON Direct Edit */
.json-editor-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.json-textarea {
  background: #090c15;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  font-family: ui-monospace, Consolas, monospace;
  font-size: 13px;
  line-height: 1.5;
  color: #a5f3fc;
  padding: 16px;
  width: 100%;
  resize: vertical;
}

.json-textarea:focus {
  outline: none;
  border-color: var(--accent);
}

.json-actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

.json-status {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
}

.json-status.success {
  color: var(--accent);
}

.json-status.error {
  color: #ef4444;
}

/* Modals */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(6, 7, 10, 0.8);
  backdrop-filter: blur(8px);
  z-index: 1100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.reply-modal {
  max-width: 500px;
  width: 100%;
  padding: 30px;
  border: 1px solid var(--border-glass);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.modal-header h3 {
  font-size: 18px;
  color: #fff;
}

.close-btn {
  background: transparent;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
}

.close-btn:hover {
  color: #fff;
}

.original-msg {
  background: rgba(255, 255, 255, 0.02);
  border-radius: 8px;
  padding: 14px;
  margin-bottom: 20px;
  text-align: left;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.original-msg strong {
  display: block;
  font-size: 11px;
  color: var(--text-muted);
  text-transform: uppercase;
  margin-bottom: 4px;
}

.original-msg p {
  font-size: 13px;
  line-height: 1.5;
  color: var(--text-secondary);
}

.modal-footer {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 24px;
}

.reply-success-alert {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
}

/* Responsive */
@media (max-width: 992px) {
  .dashboard-container {
    grid-template-columns: 1fr;
  }
  
  .dashboard-workspace {
    padding: 24px;
  }
  
  .metrics-grid {
    grid-template-columns: 1fr;
  }
  
  .crud-split {
    grid-template-columns: 1fr;
  }
}
</style>

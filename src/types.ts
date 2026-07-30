export type SocialPlatform = 'instagram' | 'facebook' | 'whatsapp' | 'tiktok';

export interface ConnectedAccount {
  id: string;
  platform: SocialPlatform;
  name: string;
  handle: string;
  avatar: string;
  status: 'connected' | 'disconnected' | 'needs_reauth';
  linkedEmail: string;
  connectedAt: string;
  followersCount: string;
  pageId?: string;
  businessAccountId?: string;
  permissions?: string[];
  tokenExpiresAt?: string;
}

export interface CommentTriggerCampaign {
  id: string;
  title: string;
  platform: SocialPlatform;
  postId: string;
  postMediaUrl: string;
  postCaption: string;
  keywords: string[];
  triggerType: 'comment' | 'story_reply' | 'dm_keyword' | 'post_mention';
  publicCommentReply: string;
  privateDMMessage: string;
  dmButtonLabel: string;
  dmTargetUrl: string;
  status: 'active' | 'paused' | 'draft';
  totalCommentsProcessed: number;
  totalDMsSent: number;
  totalClicks: number;
  createdAt: string;
}

export interface MakeWorkflowNode {
  id: string;
  type: 'trigger' | 'action' | 'router' | 'ai_gemini' | 'filter' | 'delay' | 'adsense_check';
  label: string;
  description: string;
  config: Record<string, any>;
  position: { x: number; y: number };
  iconName: string;
  color: string;
}

export interface MakeWorkflowEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
}

export interface MakeWorkflow {
  id: string;
  name: string;
  description: string;
  isEnabled: boolean;
  nodes: MakeWorkflowNode[];
  edges: MakeWorkflowEdge[];
  runCount: number;
  lastRunAt: string;
}

export interface ScheduledPost {
  id: string;
  platforms: SocialPlatform[];
  content: string;
  mediaUrl?: string;
  scheduledTime: string;
  status: 'scheduled' | 'published' | 'draft';
  autoDMAttached: boolean;
  keywordTrigger?: string;
  likesCount?: number;
  commentsCount?: number;
}

export interface AdSenseBannerConfig {
  id: string;
  slotName: string;
  slotClient: string;
  format: 'auto' | 'rectangle' | 'horizontal' | 'interstitial';
  impressions: number;
  clicks: number;
  estimatedEarnings: string;
}

export interface ContactInfo {
  instagram: string;
  whatsapp: string;
  facebook: string;
  email: string;
}

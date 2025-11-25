![DAG Media App]

DAG Media is a modern, decentralized social networking platform designed for the blockchain and Directed Acyclic Graph (DAG) community. It blends the familiarity of traditional social media with the power of Web3, offering AI-assisted content creation, crypto wallet integration, and specialized community features.
#Preview Link
https://dag-media-5un8kjqwk-sardaunatechworks-projects.vercel.app/

## 🚀 Overview

The **DAG Media App** provides a seamless experience for blockchain enthusiasts, developers, and users to connect, share knowledge, and collaborate. Built with a focus on performance, aesthetics, and user privacy, it offers a glimpse into the future of social networking on the decentralized web.

## ✨ Key Features

### 👤 User Profiles & Customization
*   **Detailed Profiles:** Customize your bio, location, and avatar.
*   **Verification:** Official verification badges for recognized accounts.
*   **Edit Profile:** Full control over personal information including email, phone, and location.

### 📝 Content Creation & Interaction
*   **Rich Posts:** Create posts with text and images.
*   **Stories:** Share ephemeral photo updates that disappear after 24 hours.
*   **AI-Assisted Drafting:** Use the integrated AI magic button to generate post drafts based on trending blockchain topics.
*   **Engagement:** Like, comment, repost, and share content seamlessly.
*   **Editing:** Edit your posts after publishing to correct typos or update information.
*   **Pinning:** Pin your favorite or most important posts to the top of your profile.

### 🌐 Explore & Communities
*   **Trending Topics:** Discover what's hot in the blockchain world with the Explore feed.
*   **Communities:** Join specialized groups like "DAG Developers" or "NFT Collectors" to connect with like-minded individuals.
*   **Search:** Find users, posts, and communities instantly.

### 🔔 Notifications
*   **Real-time Alerts:** Stay updated with notifications for likes, follows, mentions, and official announcements.
*   **Filtering:** Filter notifications to see only mentions or official updates from the BlockDAG team.

### 💼 Web3 & Wallet Integration
*   **Connect Wallet:** Seamlessly integrate with Web3 wallets (MetaMask, WalletConnect, Phantom).
*   **Portfolio Tracking:** View your crypto token balances and asset values directly within the app.
*   **NFT Gallery:** Showcase your NFT collection on a dedicated tab in your profile.

### ⚙️ Settings & Privacy
*   **Account Management:** Update your password and manage blocked accounts.
*   **Privacy Controls:** Toggle visibility settings, muted words, and read receipts.
*   **Help Center:** Access FAQs and support resources.

## 🛠️ Technology Stack

*   **Frontend:** [React](https://reactjs.org/) (v19)
*   **Language:** [TypeScript](https://www.typescriptlang.org/) for robust type safety.
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) for a modern, responsive, and dark-mode-first design.
*   **Icons:** [Lucide React](https://lucide.dev/) for consistent and beautiful iconography.
*   **AI Integration:** Google Gemini API for content generation.
*   **Build Tool:** Vite (assumed for standard React setup, though not explicitly in file list, standard for modern React).

## 📂 Project Structure
├── components/ # Reusable UI components
│ ├── App.tsx # Main application layout and routing logic
│ ├── CommunityCard.tsx
│ ├── CreatePost.tsx # Post creation input with AI integration
│ ├── EditProfileModal.tsx
│ ├── Explore.tsx
│ ├── Icons.tsx # Centralized icon exports
│ ├── MoreView.tsx # Settings and menu pages
│ ├── NotificationList.tsx
│ ├── PostCard.tsx # Individual post display component
│ ├── Sidebar.tsx # Main navigation sidebar
│ ├── Stories.tsx # Stories rail component
│ ├── StoryViewer.tsx # Full-screen story experience
│ ├── WalletView.tsx # Web3 wallet dashboard
│ └── Widgets.tsx # Right-hand sidebar widgets
├── services/
│ └── geminiService.ts # Service for Google Gemini API interactions
├── types.ts # TypeScript interfaces and types
├── constants.ts # Mock data and global constants
├── index.html # Entry HTML file
├── index.tsx # Application entry point
└── metadata.json # App metadata configuration
code
Code
## 🚀 Getting Started

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/dag-media-app.git
    cd dag-media-app
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the root directory and add your Google Gemini API key if you wish to use the AI features:
    ```env
    API_KEY=your_google_gemini_api_key
    ```

4.  **Start the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

5.  **Open in Browser:**
    Navigate to `http://localhost:5173` (or the port shown in your terminal).

## 📱 Responsive Design

The app is fully responsive and optimized for all devices:
*   **Desktop:** Full 3-column layout with sidebar, main feed, and widgets.
*   **Tablet:** Adaptive layout with condensed sidebar.
*   **Mobile:** Bottom navigation bar, simplified headers, and touch-friendly interfaces.

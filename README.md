# HoloDraft - AR CAD Editor 🥽

**Transform your CAD files into immersive AR experiences using MetaQuest technology.**

HoloDraft is a revolutionary CAD editor that bridges traditional design software with cutting-edge Augmented Reality. Upload your CAD files, convert them to AR-ready formats, and experience your 3D models in real space using MetaQuest devices.

## 🚀 New: Unity AR Integration

**Just Added:** Complete Unity integration for MetaQuest AR viewing and editing!

- 🥽 **MetaQuest AR Support** - View and edit CAD models in augmented reality
- 🌐 **Unity WebGL Viewer** - 3D model viewing directly in the browser
- 🤝 **Real-time Collaboration** - Multiple users can edit models simultaneously
- ✋ **Hand Tracking** - Natural gesture controls for model manipulation
- 🔄 **Live Synchronization** - Changes sync instantly across all platforms

## 🚀 Features

- **🎯 Modern CAD Editor Interface** - Clean, intuitive design for creating and editing CAD drawings
- **👥 User Authentication** - Secure login/signup with Supabase Auth
- **☁️ Cloud Storage** - All projects stored securely in Supabase PostgreSQL database
- **🤝 Real-time Collaboration** - Multiple users can work on projects simultaneously
- **📚 Project Management** - Create, save, load, and organize CAD projects
- **🎨 Layer Management** - Organize drawing elements into layers with customizable properties
- **📏 Drawing Tools** - Support for lines, circles, rectangles, polygons, text, and dimensions
- **📋 Version Control** - Track project history and restore previous versions
- **🔒 Row-Level Security** - Secure data access with Supabase RLS policies
- **⚡ Performance Optimized** - Efficient database queries with proper indexing

## 🏗️ Architecture

- **Frontend**: React 18 + TypeScript + CSS3
- **Backend**: Supabase (PostgreSQL + Auth + Real-time)
- **API Server**: Express.js (for additional endpoints)
- **Database**: PostgreSQL with PostGIS for geometric operations
- **Authentication**: Supabase Auth with RLS policies
- **Styling**: Modern CSS with responsive design

## 📁 Project Structure

```
cad-editor-react-website/
├── src/
│   ├── components/          # React components
│   │   └── SupabaseTest.tsx # Authentication & database testing
│   ├── lib/
│   │   └── supabaseClient.ts # Supabase configuration
│   ├── App.tsx             # Main application component
│   └── App.css             # Application styles
├── backend/
│   ├── server.js           # Express.js API server
│   └── package.json        # Backend dependencies
├── supabase/
│   ├── schema.sql          # Basic database schema
│   └── sql-editor-integration.sql # Complete database setup
├── public/                 # Static assets
├── .env                    # Environment variables (local)
├── .env.example           # Environment template
└── package.json           # Frontend dependencies
```

## 🛠️ Setup Instructions

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Supabase account** (free tier available)
- **Git**

### 1. Clone the Repository

```bash
git clone https://github.com/azrabano23/cad-editor-react-website.git
cd cad-editor-react-website
```

### 2. Install Dependencies

**Frontend dependencies:**
```bash
npm install
```

**Backend dependencies:**
```bash
cd backend
npm install
cd ..
```

### 3. Set Up Supabase

1. **Create a Supabase project:**
   - Go to [supabase.com](https://supabase.com)
   - Sign up/login and create a new project
   - Wait for the project to be ready (2-3 minutes)

2. **Get your project credentials:**
   - Go to Settings → API
   - Copy your `Project URL` and `anon public key`

3. **Set up the database:**
   - Go to SQL Editor in your Supabase dashboard
   - Copy the contents of `supabase/sql-editor-integration.sql`
   - Paste and run the SQL code to create all tables, functions, and policies

### 4. Configure Environment Variables

1. **Copy the environment template:**
```bash
cp .env.example .env
```

2. **Edit `.env` file with your Supabase credentials:**
```env
REACT_APP_SUPABASE_URL=your_supabase_project_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 5. Run the Application

**Start the frontend (main application):**
```bash
npm start
```
The app will open at [http://localhost:3000](http://localhost:3000)

**Start the backend API server (optional):**
```bash
cd backend
node server.js
```
The API server will run at [http://localhost:5000](http://localhost:5000)

## 🥽 Unity AR Integration

**NEW:** HoloDraft now supports Unity integration for MetaQuest AR experiences!

### What's Included

- **Unity WebGL Viewer** - 3D model viewing directly in your web browser
- **MetaQuest AR App** - Standalone AR application for immersive CAD editing
- **Real-time Synchronization** - Live collaboration between web and AR users
- **Hand Tracking** - Natural gesture controls for model manipulation
- **Material Editing** - Modify colors, textures, and properties in real-time
- **Export Tools** - Save modified models back to your project

### Quick Start for Unity Integration

1. **Follow the complete setup guide:**
   ```bash
   # Open the comprehensive Unity setup guide
   open UNITY_SETUP.md
   ```

2. **Directory structure for Unity:**
   ```
   unity-integration/
   ├── Scripts/
   │   ├── WebGL/          # Unity WebGL scripts
   │   ├── AR/             # MetaQuest AR scripts
   │   └── Shared/         # Common utilities
   ├── React/              # React integration components
   └── README.md           # Unity-specific documentation
   ```

3. **Prerequisites for AR development:**
   - Unity 2022.3 LTS or later
   - MetaQuest 2 or 3 device
   - Meta Developer Account
   - Unity WebGL Build Support
   - Oculus Integration package

### Features in Action

- **🌐 Web Viewer**: Click the "🥽 View in Unity" button on any converted CAD file
- **🥽 AR Session**: Start AR sessions from the web app, connect with MetaQuest
- **✋ Hand Controls**: Use pinch gestures to select and manipulate 3D models
- **🎨 Live Editing**: Material and transform changes sync across all connected devices
- **🤝 Collaboration**: Multiple users can edit the same model simultaneously

### Development Workflow

1. **Web Development**: Upload and convert CAD files in React app
2. **Unity WebGL**: Test 3D viewing and basic interactions
3. **AR Development**: Build and deploy to MetaQuest for immersive editing
4. **Live Testing**: Verify real-time sync between all platforms

> **📚 Full Documentation**: See `UNITY_SETUP.md` for complete setup instructions, troubleshooting, and advanced features.

## 🗄️ Database Schema

The application uses a comprehensive PostgreSQL schema with the following main tables:

- **`profiles`** - User profiles (extends Supabase auth)
- **`cad_projects`** - CAD project metadata
- **`cad_elements`** - Individual drawing elements (lines, circles, etc.)
- **`cad_layers`** - Layer organization and properties
- **`project_collaborators`** - Project sharing and permissions
- **`project_versions`** - Version control and history

### Key Features of the Database:
- ✅ **Row Level Security (RLS)** for secure data access
- ✅ **Automated triggers** for timestamps and default layers
- ✅ **Performance indexes** for fast queries
- ✅ **Database functions** for complex operations
- ✅ **PostGIS support** for geometric calculations

## 🔧 Development

### Available Scripts

- **`npm start`** - Run development server
- **`npm test`** - Run test suite
- **`npm run build`** - Build for production
- **`npm run eject`** - Eject from Create React App (irreversible)

### Adding New Features

1. **Database changes**: Update `supabase/sql-editor-integration.sql`
2. **Frontend components**: Add to `src/components/`
3. **API endpoints**: Extend `backend/server.js`
4. **Styling**: Update `src/App.css`

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)

1. **Build the project:**
```bash
npm run build
```

2. **Deploy to your preferred platform:**
   - **Vercel**: Connect your GitHub repo
   - **Netlify**: Drag and drop the `build` folder
   - **Other**: Use the `build` folder contents

3. **Set environment variables** in your deployment platform

### Backend Deployment (Optional)

The Express.js backend can be deployed to:
- **Heroku**
- **Railway**
- **Render**
- **DigitalOcean App Platform**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Troubleshooting

### Common Issues

**"Cannot connect to Supabase"**
- Check your `.env` file has correct Supabase URL and key
- Ensure your Supabase project is active
- Verify network connectivity

**"Database schema errors"**
- Make sure you ran the complete SQL from `supabase/sql-editor-integration.sql`
- Check the SQL Editor in Supabase dashboard for any error messages

**"Build errors"**
- Run `npm install` to ensure all dependencies are installed
- Check Node.js version (requires v16+)

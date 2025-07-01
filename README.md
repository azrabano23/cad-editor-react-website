# CAD Editor React Website with Supabase Integration

🎨 **A modern, web-based CAD (Computer-Aided Design) editor built with React, TypeScript, and Supabase**

This project provides a comprehensive CAD editor application with real-time collaboration, user authentication, project management, and cloud storage capabilities.

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

## 🔒 Security

- **Authentication**: Managed by Supabase Auth
- **Authorization**: Row Level Security (RLS) policies
- **Data Protection**: HTTPS enforced, secure API keys
- **Input Validation**: Client and server-side validation

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

### Need Help?

- 📧 **Email**: [Your email here]
- 🐛 **Issues**: [GitHub Issues](https://github.com/azrabano23/cad-editor-react-website/issues)
- 📖 **Documentation**: [Supabase Docs](https://supabase.com/docs)

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Supabase** for the backend-as-a-service platform
- **Create React App** for the project boilerplate
- **PostGIS** for geometric operations

---

**Built with ❤️ using React, TypeScript, and Supabase**

# HoloDraft - AR CAD Editor

🥽 **The Future of CAD Design in Augmented Reality**

HoloDraft is a revolutionary web-based CAD editor that transforms traditional 3D models into immersive AR experiences. Upload your CAD files, convert them to AR-ready formats, and visualize them in augmented reality using MetaQuest devices.

![HoloDraft Banner](https://img.shields.io/badge/HoloDraft-AR%20CAD%20Editor-blue?style=for-the-badge&logo=unity)

## 🚀 Features

### ✨ **Core Functionality**
- **📤 Multi-format Upload**: Support for STL, STEP, OBJ, PLY, and DAE files
- **🔄 Real-time Conversion**: Automatic STL to FBX conversion using Blender
- **🎮 Unity WebGL Viewer**: Interactive 3D model viewer in the browser
- **🥽 MetaQuest AR Integration**: Full AR experience with hand tracking
- **🎨 Material Editor**: Real-time material and texture editing
- **📐 Transform Controls**: Precise positioning, rotation, and scaling

### 🛠️ **Technical Stack**
- **Frontend**: React 19 + TypeScript + Supabase
- **Backend**: Node.js + Express + Multer
- **3D Engine**: Unity 2022.3+ with Mixed Reality Toolkit
- **AR Platform**: MetaQuest 2/3 with hand tracking
- **Conversion**: Blender 4.4+ Python API
- **Database**: Supabase (PostgreSQL)

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Web    │    │   Node.js API   │    │  Unity WebGL    │
│     Frontend    │ ←→ │     Backend     │ ←→ │     Viewer      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│    Supabase     │    │     Blender     │    │   MetaQuest     │
│    Database     │    │   STL→FBX       │    │   AR Session    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 📦 Installation

### Prerequisites
- Node.js 16+
- Unity 2022.3 LTS or later
- Blender 4.0+ (for STL conversion)
- MetaQuest 2/3 device (for AR features)

### 1. Clone the Repository
```bash
git clone https://github.com/azrabano23/cad-editor-react-website.git
cd cad-editor-react-website
```

### 2. Install Dependencies
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### 3. Environment Setup
```bash
# Copy environment files
cp .env.example .env
cp backend/.env.example backend/.env

# Configure your Supabase credentials in .env
```

### 4. Install Blender (macOS)
```bash
# Option 1: Download from blender.org
# Option 2: Install via Homebrew
brew install --cask blender
```

## 🚀 Quick Start

### 1. Start the Backend Server
```bash
cd backend
npm start
```
The backend will run on `http://localhost:5000`

### 2. Start the Frontend
```bash
npm start
```
The frontend will run on `http://localhost:3000`

### 3. Upload and Convert
1. Navigate to `http://localhost:3000`
2. Upload an STL file (or other supported formats)
3. Click "Convert to FBX"
4. View your model in the Unity WebGL viewer

## 🎮 Unity Integration

### WebGL Build Setup
1. Open the Unity project at `/ar-vr-visualization-of-data/`
2. Install required packages:
   - Mixed Reality Toolkit
   - XR Interaction Toolkit
   - Newtonsoft JSON
3. Build for WebGL:
   ```
   File → Build Settings → WebGL → Build
   ```
4. Place build output in `/public/unity-builds/webgl/`

### AR Build Setup (MetaQuest)
1. Switch platform to Android
2. Configure XR settings:
   - Enable Oculus provider
   - Set target device to Quest 2 & 3
3. Build and deploy to MetaQuest device

## 🗂️ Project Structure

```
cad-editor-react-website/
├── 📁 src/
│   ├── 📁 components/
│   │   ├── UnityCADViewer.tsx      # Main Unity integration component
│   │   ├── SupabaseTest.tsx        # Database connection test
│   │   └── ...
│   ├── 📁 lib/
│   │   └── supabaseClient.ts       # Supabase configuration
│   └── App.tsx                     # Main application
├── 📁 backend/
│   ├── server.js                   # Express server + Blender integration
│   ├── 📁 uploads/                 # Uploaded STL files
│   ├── 📁 converted/               # Converted FBX files
│   └── 📁 scripts/                 # Blender Python scripts
├── 📁 unity-integration/
│   ├── 📁 Scripts/
│   │   ├── 📁 WebGL/              # Unity WebGL scripts
│   │   ├── 📁 AR/                 # MetaQuest AR scripts
│   │   └── 📁 React/              # React integration
│   └── 📁 Scenes/                 # Unity scenes
├── 📁 public/
│   ├── 📁 unity-builds/           # Unity WebGL builds
│   └── unity-bridge.js            # Unity ↔ React communication
├── 📁 supabase/                   # Database schema and migrations
└── 📄 README.md                   # This file
```

## 🔧 API Reference

### Backend Endpoints

#### Upload File
```http
POST /api/upload
Content-Type: multipart/form-data

{
  "file": <STL_FILE>
}
```

#### Convert to FBX
```http
POST /api/convert/:fileId
Content-Type: application/json
```

#### Get Files
```http
GET /api/files
```

#### Health Check
```http
GET /api/health
```

### Unity Integration

#### Load Model
```javascript
window.unityBridge.loadModel({
  fileId: "file-id",
  fileName: "model.fbx",
  downloadUrl: "/converted/model.fbx"
});
```

#### Transform Model
```javascript
window.unityBridge.transformModel({
  fileId: "file-id",
  position: {x: 0, y: 0, z: 0},
  rotation: {x: 0, y: 0, z: 0},
  scale: {x: 1, y: 1, z: 1}
});
```

#### Start AR Session
```javascript
window.unityBridge.startARSession({
  fileId: "file-id",
  enableHandTracking: true,
  enableCollaboration: false
});
```

## 🎯 Usage Examples

### Basic File Upload and Conversion
```typescript
// Upload STL file
const handleFileUpload = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData
  });
  
  const result = await response.json();
  return result.file.id;
};

// Convert to FBX
const convertToFBX = async (fileId: string) => {
  const response = await fetch(`/api/convert/${fileId}`, {
    method: 'POST'
  });
  
  const result = await response.json();
  return result.convertedUrl;
};
```

### Unity AR Integration
```csharp
// C# script for Unity AR setup
public class ARCADEditor : MonoBehaviour
{
    [Header("AR Settings")]
    public GameObject modelContainer;
    public Material defaultMaterial;
    
    void Start()
    {
        // Initialize AR session
        InitializeARSession();
    }
    
    private void InitializeARSession()
    {
        // Set up hand tracking
        // Configure model interaction
        // Enable real-time synchronization
    }
}
```

## 🛡️ Security & Performance

### Security Features
- ✅ File type validation
- ✅ File size limits (50MB)
- ✅ Secure file uploads
- ✅ Supabase RLS policies

### Performance Optimizations
- ✅ Efficient STL to FBX conversion
- ✅ Model compression for web
- ✅ Progressive loading
- ✅ WebGL optimization

## 🧪 Testing

### Run Tests
```bash
# Frontend tests
npm test

# Backend tests
cd backend && npm test

# Unity tests (in Unity Editor)
```

### Test AR Features
1. Upload a test STL file
2. Convert to FBX
3. Open Unity viewer
4. Test hand tracking on MetaQuest

## 📱 MetaQuest Setup

### Requirements
- MetaQuest 2 or MetaQuest 3
- Developer mode enabled
- Unity app sideloaded

### Setup Steps
1. Enable Developer Mode in MetaQuest app
2. Connect MetaQuest to PC via USB
3. Build Unity app for Android
4. Deploy using Unity or adb

## 🔄 Workflow

```mermaid
graph LR
    A[Upload STL] ---Origin Git certain laws dependably a URL defined an[xertainesynchronous law)] B[Backend Processing]
    B ---Origin Git certain laws dependably a URL defined an[xertainesynchronous law)] C[Blender Conversion]
    C ---Origin Git certain laws dependably a URL defined an[xertainesynchronous law)] D[FBX Output]
    D ---Origin Git certain laws dependably a URL defined an[xertainesynchronous law)] E[Unity WebGL Viewer]
    E ---Origin Git certain laws dependably a URL defined an[xertainesynchronous law)] F[MetaQuest AR]
    F ---Origin Git certain laws dependably a URL defined an[xertainesynchronous law)] G[Hand Tracking]
    G ---Origin Git certain laws dependably a URL defined an[xertainesynchronous law)] H[Model Manipulation]
```

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Code Standards
- TypeScript for frontend
- ESLint configuration
- Prettier formatting
- C# standards for Unity

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Unity Technologies** - Mixed Reality Toolkit
- **Meta** - MetaQuest platform
- **Blender Foundation** - 3D modeling software
- **Supabase** - Backend as a Service
- **React Team** - Frontend framework

## 📞 Support

### Documentation
- [Unity Setup Guide](UNITY_SETUP.md)
- [Quick Start Guide](QUICK_START_UNITY.md)
- [API Documentation](docs/API.md)

### Community
- 🐛 [Report Issues](https://github.com/azrabano23/cad-editor-react-website/issues)
- 💬 [Discussions](https://github.com/azrabano23/cad-editor-react-website/discussions)
- 📧 [Contact](mailto:azrabano23@example.com)

---

**Built with ❤️ for the future of AR CAD design**

[![Unity](https://img.shields.io/badge/Unity-2022.3+-black?style=flat-square&logo=unity)](https://unity.com/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![MetaQuest](https://img.shields.io/badge/MetaQuest-2%2F3-purple?style=flat-square&logo=meta)](https://www.meta.com/quest/)
[![Blender](https://img.shields.io/badge/Blender-4.4+-orange?style=flat-square&logo=blender)](https://www.blender.org/)


import React, { useState, useRef } from 'react';
import './App.css';
import SupabaseTest from './components/SupabaseTest';

interface UploadedFile {
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'uploaded' | 'converting' | 'converted' | 'error';
  originalFormat: string;
  convertedUrl?: string;
  errorMessage?: string;
  id?: string;
}

function App() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const supportedFormats = ['stl', 'step', 'obj', 'ply', 'dae'];
  const maxFileSize = 50 * 1024 * 1024; // 50MB

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (fileList: FileList) => {
    const newFiles: UploadedFile[] = [];
    
    Array.from(fileList).forEach(file => {
      const extension = file.name.split('.').pop()?.toLowerCase();
      
      if (!extension || !supportedFormats.includes(extension)) {
        alert(`Unsupported file format: ${extension}. Supported formats: ${supportedFormats.join(', ')}`);
        return;
      }
      
      if (file.size > maxFileSize) {
        alert(`File too large: ${file.name}. Maximum size is 50MB.`);
        return;
      }
      
      const uploadedFile: UploadedFile = {
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'uploading',
        originalFormat: extension
      };
      
      newFiles.push(uploadedFile);
      
      // Simulate upload process
      setTimeout(() => {
        setFiles(prev => prev.map(f => 
          f.name === file.name ? { ...f, status: 'uploaded' } : f
        ));
      }, 1000);
    });
    
    setFiles(prev => [...prev, ...newFiles]);
  };

  const convertToFBX = async (file: UploadedFile) => {
    setFiles(prev => prev.map(f => 
      f.name === file.name ? { ...f, status: 'converting' } : f
    ));

    try {
      // Simulate conversion process - In real implementation, this would call your backend
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setFiles(prev => prev.map(f => 
        f.name === file.name ? { 
          ...f, 
          status: 'converted',
          convertedUrl: `/converted/${file.name.replace(/\.[^/.]+$/, '.fbx')}`
        } : f
      ));
    } catch (error) {
      setFiles(prev => prev.map(f => 
        f.name === file.name ? { 
          ...f, 
          status: 'error',
          errorMessage: 'Conversion failed. Please try again.'
        } : f
      ));
    }
  };

  const openARViewer = (file: UploadedFile) => {
    if (file.status === 'converted' && file.convertedUrl) {
      // In a real implementation, this would open the MetaQuest AR viewer
      alert(`Opening ${file.name} in AR Viewer for MetaQuest...\nFile ready for AR visualization!`);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'uploading': return '⏳';
      case 'uploaded': return '✅';
      case 'converting': return '🔄';
      case 'converted': return '🎯';
      case 'error': return '❌';
      default: return '📄';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'uploading': return 'Uploading...';
      case 'uploaded': return 'Ready for conversion';
      case 'converting': return 'Converting to FBX...';
      case 'converted': return 'Ready for AR';
      case 'error': return 'Error';
      default: return 'Unknown';
    }
  };

  return (
    <div className="App">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-brand">
            <div className="logo-icon">H</div>
            <span className="logo-text">HoloDraft</span>
          </div>
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#how-it-works">How it Works</a>
            <a href="#tech">Technology</a>
            <button className="nav-cta">Get Started</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">HoloDraft</h1>
            <p className="hero-subtitle">The Future of CAD Design in Augmented Reality</p>
            <p className="hero-description">
              Transform your CAD files into immersive AR experiences. Design, visualize, and edit 3D models 
              directly in augmented reality using MetaQuest technology.
            </p>
            <div className="hero-actions">
              <button className="btn-primary">Start Converting</button>
              <button className="btn-secondary">Watch Demo</button>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">5+</span>
                <span className="stat-label">File Formats</span>
              </div>
              <div className="stat">
                <span className="stat-number">Real-time</span>
                <span className="stat-label">Conversion</span>
              </div>
              <div className="stat">
                <span className="stat-number">AR-Ready</span>
                <span className="stat-label">Output</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-graphic">
              <div className="floating-card card-1"></div>
              <div className="floating-card card-2"></div>
              <div className="floating-card card-3"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="app-main">
        {/* Project Overview */}
        <section className="project-overview">
          <div className="container">
            <h2>What is HoloDraft?</h2>
            <div className="overview-grid">
              <div className="overview-card">
                <div className="card-icon">⚡</div>
                <h3>Revolutionary CAD Experience</h3>
                <p>
                  HoloDraft bridges the gap between traditional CAD software and immersive AR technology. 
                  Our platform enables engineers, designers, and creators to view and edit their 3D models 
                  in a completely new dimension.
                </p>
              </div>
              <div className="overview-card">
                <div className="card-icon">🔄</div>
                <h3>Seamless File Conversion</h3>
                <p>
                  Upload your existing CAD files in multiple formats (STL, STEP, OBJ, PLY, DAE) and 
                  watch as our advanced pipeline converts them to AR-ready FBX files optimized for 
                  MetaQuest visualization.
                </p>
              </div>
              <div className="overview-card">
                <div className="card-icon">👓</div>
                <h3>MetaQuest Integration</h3>
                <p>
                  Experience your designs like never before. Walk around, scale, and manipulate 
                  your 3D models in real space using MetaQuest's cutting-edge AR capabilities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Upload Section */}
        <section className="upload-section">
          <div className="container">
            <h2>Upload Your CAD Files</h2>
            <div 
              className={`upload-zone ${dragActive ? 'drag-active' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="upload-content">
                <div className="upload-icon">📁</div>
                <h3>Drop CAD files here or click to browse</h3>
                <p>Supported formats: {supportedFormats.join(', ').toUpperCase()}</p>
                <p>Maximum file size: 50MB</p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept={supportedFormats.map(f => `.${f}`).join(',')}
                onChange={handleFileSelect}
                style={{ display: 'none' }}
              />
            </div>
          </div>
        </section>

        {files.length > 0 && (
          <div className="files-section">
            <h2>📋 Uploaded Files</h2>
            <div className="files-list">
              {files.map((file, index) => (
                <div key={index} className="file-item">
                  <div className="file-info">
                    <div className="file-icon">{getStatusIcon(file.status)}</div>
                    <div className="file-details">
                      <h4>{file.name}</h4>
                      <p>{formatFileSize(file.size)} • {file.originalFormat.toUpperCase()}</p>
                      <p className={`status status-${file.status}`}>
                        {getStatusText(file.status)}
                      </p>
                      {file.errorMessage && (
                        <p className="error-message">{file.errorMessage}</p>
                      )}
                    </div>
                  </div>
                  <div className="file-actions">
                    {file.status === 'uploaded' && (
                      <button 
                        className="action-btn convert-btn"
                        onClick={() => convertToFBX(file)}
                      >
                        🔄 Convert to FBX
                      </button>
                    )}
                    {file.status === 'converted' && (
                      <button 
                        className="action-btn ar-btn"
                        onClick={() => openARViewer(file)}
                      >
                        🥽 View in AR
                      </button>
                    )}
                    {file.status === 'converting' && (
                      <div className="converting-spinner">Converting...</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="info-section">
          <div className="info-grid">
            <div className="info-card">
              <h3>📤 Upload</h3>
              <p>Upload your CAD files in STL, STEP, OBJ, PLY, or DAE format</p>
            </div>
            <div className="info-card">
              <h3>🔄 Convert</h3>
              <p>Files are automatically converted to FBX format for AR compatibility</p>
            </div>
            <div className="info-card">
              <h3>🥽 View in AR</h3>
              <p>Experience your 3D models in augmented reality using MetaQuest</p>
            </div>
            <div className="info-card">
              <h3>✏️ Edit</h3>
              <p>Real-time editing capabilities in the AR environment</p>
            </div>
          </div>
        </div>

        {/* Workflow Section */}
        <section className="workflow-section">
          <div className="container">
            <h2>How HoloDraft Works</h2>
            <div className="workflow-steps">
              <div className="workflow-step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Upload CAD Files</h3>
                  <p>Start by uploading your existing CAD files in supported formats</p>
                </div>
              </div>
              <div className="workflow-arrow">→</div>
              <div className="workflow-step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>Automatic Conversion</h3>
                  <p>Our Blender-powered pipeline converts files to FBX format</p>
                </div>
              </div>
              <div className="workflow-arrow">→</div>
              <div className="workflow-step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>AR Experience</h3>
                  <p>View and edit your models in immersive AR on MetaQuest</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Specs */}
        <section className="tech-specs">
          <div className="container">
            <h2>🔧 Technical Architecture</h2>
            <div className="specs-grid">
              <div className="spec-item">
                <div className="spec-icon">⚛️</div>
                <strong>Frontend</strong>
                <p>React + TypeScript</p>
              </div>
              <div className="spec-item">
                <div className="spec-icon">🖥️</div>
                <strong>Backend</strong>
                <p>Node.js + Express</p>
              </div>
              <div className="spec-item">
                <div className="spec-icon">⚙️</div>
                <strong>Conversion</strong>
                <p>Python + Blender API</p>
              </div>
              <div className="spec-item">
                <div className="spec-icon">🗄️</div>
                <strong>Database</strong>
                <p>Supabase</p>
              </div>
              <div className="spec-item">
                <div className="spec-icon">🥽</div>
                <strong>AR Platform</strong>
                <p>MetaQuest Compatible</p>
              </div>
              <div className="spec-item">
                <div className="spec-icon">📁</div>
                <strong>File Formats</strong>
                <p>STL → STEP → OBJ → FBX</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="footer-logo">
                <span className="logo-icon">🎯</span>
                <span className="logo-text">HoloDraft</span>
              </div>
              <p>Revolutionizing CAD design through AR technology</p>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h4>Product</h4>
                <a href="#features">Features</a>
                <a href="#pricing">Pricing</a>
                <a href="#documentation">Documentation</a>
              </div>
              <div className="footer-column">
                <h4>Support</h4>
                <a href="#help">Help Center</a>
                <a href="#contact">Contact Us</a>
                <a href="#status">System Status</a>
              </div>
              <div className="footer-column">
                <h4>Developers</h4>
                <a href="#api">API Reference</a>
                <a href="#sdk">SDK Download</a>
                <a href="#github">GitHub</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2024 HoloDraft. Bringing CAD to Augmented Reality.</p>
          </div>
        </div>
      </footer>
      
      {/* Supabase Connection Test */}
      <SupabaseTest />
    </div>
  );
}

export default App;

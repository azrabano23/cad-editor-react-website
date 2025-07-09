// Mock Unity Loader for Development
window.UnityLoader = {
    instantiate: function(canvasId, buildUrl, options) {
        console.log('🎮 Unity Mock Loader: Instantiating Unity instance');
        console.log('Canvas ID:', canvasId);
        console.log('Build URL:', buildUrl);
        
        // Create mock Unity instance
        var unityInstance = {
            SendMessage: function(objectName, methodName, value) {
                console.log('🎮 Unity Mock: SendMessage', objectName, methodName, value);
                
                // Simulate Unity responses
                if (methodName === 'LoadCADModel') {
                    setTimeout(() => {
                        if (window.unityMessageHandler) {
                            window.unityMessageHandler('onModelLoadProgress', JSON.stringify({
                                fileId: 'test-file',
                                progress: 1.0,
                                status: 'complete'
                            }));
                        }
                    }, 1000);
                }
                
                if (methodName === 'TransformModel') {
                    setTimeout(() => {
                        if (window.unityMessageHandler) {
                            window.unityMessageHandler('onModelTransformed', JSON.stringify({
                                fileId: 'test-file',
                                transform: {
                                    position: { x: 0, y: 0, z: 0 },
                                    rotation: { x: 0, y: 0, z: 0 },
                                    scale: { x: 1, y: 1, z: 1 }
                                }
                            }));
                        }
                    }, 500);
                }
                
                if (methodName === 'StartARSession') {
                    setTimeout(() => {
                        if (window.unityMessageHandler) {
                            window.unityMessageHandler('onARSessionStatus', JSON.stringify({
                                isActive: true,
                                sessionId: 'mock-session-' + Date.now()
                            }));
                        }
                    }, 1000);
                }
            },
            
            Quit: function() {
                console.log('🎮 Unity Mock: Quit');
            }
        };
        
        // Initialize canvas
        var canvas = document.getElementById(canvasId);
        if (canvas) {
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
            
            // Create simple WebGL context for visual feedback
            var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            if (gl) {
                gl.clearColor(0.1, 0.1, 0.1, 1.0);
                gl.clear(gl.COLOR_BUFFER_BIT);
                
                // Add some visual feedback
                setTimeout(() => {
                    gl.clearColor(0.2, 0.3, 0.4, 1.0);
                    gl.clear(gl.COLOR_BUFFER_BIT);
                }, 1000);
            }
            
            // Add click handler for interaction
            canvas.addEventListener('click', function(e) {
                console.log('🎮 Unity Mock: Canvas clicked', e.clientX, e.clientY);
                
                // Simulate model interaction
                if (window.unityMessageHandler) {
                    window.unityMessageHandler('onModelTransformed', JSON.stringify({
                        fileId: 'test-file',
                        transform: {
                            position: { x: Math.random() * 2 - 1, y: 0, z: 0 },
                            rotation: { x: 0, y: Math.random() * 360, z: 0 },
                            scale: { x: 1, y: 1, z: 1 }
                        }
                    }));
                }
            });
        }
        
        // Simulate Unity ready event
        setTimeout(() => {
            console.log('🎮 Unity Mock: Ready');
            if (window.unityMessageHandler) {
                window.unityMessageHandler('onUnityReady', JSON.stringify({
                    status: 'ready',
                    timestamp: new Date().toISOString(),
                    features: ['modelLoading', 'editing', 'mock']
                }));
            }
        }, 2000);
        
        return unityInstance;
    }
};

console.log('🎮 Unity Mock Loader initialized');

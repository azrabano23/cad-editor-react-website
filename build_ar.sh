#!/bin/bash

# Unity AR build script
/Applications/Unity/Hub/Editor/2022.3.0f1/Unity.app/Contents/MacOS/Unity \
  -batchmode -quit \
  -projectPath "/Users/azrabano/cad-editor-react-website/UnityProject" \
  -buildTarget Android \
  -executeMethod BuildManager.BuildAR \
  -logFile /dev/stdout

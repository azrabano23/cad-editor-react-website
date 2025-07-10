#!/bin/bash

# Unity HoloLens build script
/Applications/Unity/Hub/Editor/2022.3.0f1/Unity.app/Contents/MacOS/Unity \
  -batchmode -quit \
  -projectPath "/Users/azrabano/cad-editor-react-website/UnityProject" \
  -buildTarget WSAPlayer \
  -executeMethod BuildManager.BuildHoloLens \
  -logFile /dev/stdout

#!/bin/bash
cd /home/kavia/workspace/code-generation/webtictactoe-111898-6c31d35a/webtic_tac_toe
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi


@echo off
echo Running LOINC code tests...
echo.

npx playwright test tests/loinc-code.spec.js

pause
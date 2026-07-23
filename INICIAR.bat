@echo off
title Hoja de Vida - Backend Java + Frontend React
color 0A
cls

echo ============================================================
echo    HOJA DE VIDA - BACKEND JAVA + FRONTEND REACT
echo ============================================================
echo.

echo [1/2] Iniciando Backend Java (Spring Boot)...
echo Puerto: http://localhost:8080
echo.
start "Backend Java" cmd /c "cd /d %~dp0 && .\mvnw.cmd spring-boot:run"

echo [2/2] Iniciando Frontend React (Vite)...
echo Puerto: http://localhost:5173
echo.
timeout /t 5 /nobreak > nul
start "Frontend React" cmd /c "cd /d %~dp0 && npm run dev"

echo.
echo ============================================================
echo    SERVIDORES INICIADOS
echo ============================================================
echo.
echo    Backend:   http://localhost:8080
echo    Frontend:  http://localhost:5173
echo    API:       http://localhost:8080/api/contact
echo    H2 Console: http://localhost:8080/h2-console
echo.
echo    Cierra las ventanas para detener los servidores.
echo ============================================================
echo.
pause
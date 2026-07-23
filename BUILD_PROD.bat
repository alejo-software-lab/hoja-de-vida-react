@echo off
title Hoja de Vida - Build Produccion
color 0B
cls

echo ============================================================
echo    HOJA DE VIDA - BUILD DE PRODUCCION
echo ============================================================
echo.
echo Esto construira:
echo   1. Frontend React  -> src/main/frontend/dist/
echo   2. Backend Java    -> target/hoja-de-vida-backend-1.0.0.jar
echo.

echo [1/2] Construyendo frontend + backend con Maven...
echo.
call .\mvnw.cmd clean package -Pprod

if %ERRORLEVEL% neq 0 (
    echo.
    echo ============================================================
    echo    ERROR EN EL BUILD
    echo ============================================================
    echo.
    pause
    exit /b 1
)

echo.
echo ============================================================
echo    BUILD COMPLETADO EXITOSAMENTE
echo ============================================================
echo.
echo    JAR generado: target\hoja-de-vida-backend-1.0.0.jar
echo.
echo    Para ejecutar en produccion:
echo    java -jar target\hoja-de-vida-backend-1.0.0.jar
echo.
echo    El servidor estara en: http://localhost:8080
echo    (Frontend y backend en el mismo puerto)
echo ============================================================
echo.
pause
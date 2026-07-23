@REM ----------------------------------------------------------------------------
@REM Licensed to the Apache Software Foundation (ASF) under one
@REM or more contributor license agreements.  See the NOTICE file
@REM distributed with this work for additional information
@REM regarding copyright ownership.  The ASF licenses this file
@REM to you under the Apache License, Version 2.0 (the
@REM "License"); you may not use this file except in compliance
@REM with the License.  You may obtain a copy of the License at
@REM
@REM    http://www.apache.org/licenses/LICENSE-2.0
@REM
@REM Unless required by applicable law or agreed to in writing,
@REM software distributed under the License is distributed on an
@REM "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
@REM KIND, either express or implied.  See the License for the
@REM specific language governing permissions and limitations
@REM under the License.
@REM ----------------------------------------------------------------------------

@REM ----------------------------------------------------------------------------
@REM Apache Maven Wrapper startup script for Windows
@REM ----------------------------------------------------------------------------

@echo off
setlocal

@REM Determine project base directory
set "MAVEN_PROJECTBASEDIR=%~dp0"

@REM Set default MAVEN_OPTS
if not defined MAVEN_OPTS set "MAVEN_OPTS=-Xmx512m"

@REM Wrapper properties
set "WRAPPER_PROPERTIES=%MAVEN_PROJECTBASEDIR%.mvn\wrapper\maven-wrapper.properties"

@REM Read distributionUrl from properties
if exist "%WRAPPER_PROPERTIES%" (
    for /f "tokens=1,* delims==" %%a in ('findstr /i "distributionUrl" "%WRAPPER_PROPERTIES%"') do (
        set "distributionUrl=%%b"
    )
)

@REM Default distributionUrl if not set
if not defined distributionUrl set "distributionUrl=https://repo.maven.apache.org/maven2/org/apache/maven/apache-maven/3.9.12/apache-maven-3.9.12-bin.zip"

@REM Wrapper cache directory
set "WRAPPER_CACHE=%USERPROFILE%\.m2\wrapper\dists"

@REM Generate hash from URL
for %%i in ("%distributionUrl%") do set "WRAPPER_HASH=%%~ni"

set "WRAPPER_DIR=%WRAPPER_CACHE%\%WRAPPER_HASH%"

@REM Download and extract Maven if not cached
if not exist "%WRAPPER_DIR%\apache-maven" (
    echo Downloading Maven from %distributionUrl%
    mkdir "%WRAPPER_DIR%" 2>nul
    
    powershell -Command "& {$ProgressPreference='SilentlyContinue'; Invoke-WebRequest -Uri '%distributionUrl%' -OutFile '%WRAPPER_DIR%\maven.zip'}"
    
    powershell -Command "& {$ProgressPreference='SilentlyContinue'; Expand-Archive -Path '%WRAPPER_DIR%\maven.zip' -DestinationPath '%WRAPPER_DIR%' -Force}"
    
    del "%WRAPPER_DIR%\maven.zip" 2>nul
)

@REM Find Maven executable
for /d %%i in ("%WRAPPER_DIR%\apache-maven-*") do set "MVN_HOME=%%i"

set "MVN_CMD=%MVN_HOME%\bin\mvn.cmd"

if not exist "%MVN_CMD%" (
    echo Error: Maven not found at %MVN_CMD%
    exit /b 1
)

"%MVN_CMD%" %*

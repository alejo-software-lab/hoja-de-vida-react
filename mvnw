#!/bin/sh
# ----------------------------------------------------------------------------
# Licensed to the Apache Software Foundation (ASF) under one
# or more contributor license agreements.  See the NOTICE file
# distributed with this work for additional information
# regarding copyright ownership.  The ASF licenses this file
# to you under the Apache License, Version 2.0 (the
# "License"); you may not use this file except in compliance
# with the License.  You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing,
# software distributed under the License is distributed on an
# "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
# KIND, either express or implied.  See the License for the
# specific language governing permissions and limitations
# under the License.
# ----------------------------------------------------------------------------

# ----------------------------------------------------------------------------
# Apache Maven Wrapper startup script for UN*X systems
# ----------------------------------------------------------------------------

# Determine the project base directory
if [ -z "$MAVEN_PROJECTBASEDIR" ]; then
  MAVEN_PROJECTBASEDIR=$( cd "$( dirname "$0" )" && pwd )
  export MAVEN_PROJECTBASEDIR
fi

MAVEN_OPTS="${MAVEN_OPTS:--Xmx512m}"
export MAVEN_OPTS

# Wrapper properties
WRAPPER_PROPERTIES="$MAVEN_PROJECTBASEDIR/.mvn/wrapper/maven-wrapper.properties"

# Read distributionUrl from properties
if [ -f "$WRAPPER_PROPERTIES" ]; then
  distributionUrl=$( grep '^distributionUrl=' "$WRAPPER_PROPERTIES" | sed 's/distributionUrl=//' )
fi

# Default distributionUrl if not set
if [ -z "$distributionUrl" ]; then
  distributionUrl="https://repo.maven.apache.org/maven2/org/apache/maven/apache-maven/3.9.12/apache-maven-3.9.12-bin.zip"
fi

# Wrapper cache directory
WRAPPER_CACHE="$HOME/.m2/wrapper/dists"
WRAPPER_HASH=$( echo -n "$distributionUrl" | md5sum | awk '{print $1}' )
WRAPPER_DIR="$WRAPPER_CACHE/$WRAPPER_HASH"

# Download and extract Maven if not cached
if [ ! -d "$WRAPPER_DIR/apache-maven" ]; then
  echo "Downloading Maven from $distributionUrl"
  mkdir -p "$WRAPPER_DIR"
  
  if command -v curl > /dev/null 2>&1; then
    curl -fsSL "$distributionUrl" -o "$WRAPPER_DIR/maven.zip"
  elif command -v wget > /dev/null 2>&1; then
    wget -q "$distributionUrl" -O "$WRAPPER_DIR/maven.zip"
  else
    echo "Error: Neither curl nor wget found. Please install one."
    exit 1
  fi
  
  unzip -q "$WRAPPER_DIR/maven.zip" -d "$WRAPPER_DIR"
  rm "$WRAPPER_DIR/maven.zip"
fi

# Find the Maven executable
MVN_HOME=$( find "$WRAPPER_DIR" -name "apache-maven-*" -type d -maxdepth 1 | head -1 )
if [ -z "$MVN_HOME" ]; then
  MVN_HOME="$WRAPPER_DIR/apache-maven-3.9.12"
fi

MVN_CMD="$MVN_HOME/bin/mvn"

if [ ! -f "$MVN_CMD" ]; then
  echo "Error: Maven not found at $MVN_CMD"
  exit 1
fi

exec "$MVN_CMD" "$@"

#!/bin/bash

# Helper script to create a new feature branch with proper naming
# Usage: ./scripts/new-branch.sh <type> <description>
# Example: ./scripts/new-branch.sh feat add-contact-form

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Valid branch types
VALID_TYPES=("feat" "fix" "docs" "style" "refactor" "perf" "test" "build" "ci" "chore" "hotfix")

# Function to display usage
usage() {
    echo -e "${BLUE}Usage:${NC} ./scripts/new-branch.sh <type> <description>"
    echo ""
    echo "Valid types:"
    echo "  feat      - New feature"
    echo "  fix       - Bug fix"
    echo "  docs      - Documentation changes"
    echo "  style     - Code style changes (formatting, etc.)"
    echo "  refactor  - Code refactoring"
    echo "  perf      - Performance improvements"
    echo "  test      - Adding or updating tests"
    echo "  build     - Build system changes"
    echo "  ci        - CI/CD changes"
    echo "  chore     - Maintenance tasks"
    echo "  hotfix    - Emergency production fix"
    echo ""
    echo "Example:"
    echo "  ./scripts/new-branch.sh feat add-contact-form"
    echo "  ./scripts/new-branch.sh fix resolve-button-click"
    exit 1
}

# Check if arguments are provided
if [ $# -lt 2 ]; then
    echo -e "${RED}Error: Missing arguments${NC}"
    usage
fi

TYPE=$1
DESCRIPTION=$2

# Validate branch type
if [[ ! " ${VALID_TYPES[@]} " =~ " ${TYPE} " ]]; then
    echo -e "${RED}Error: Invalid branch type '${TYPE}'${NC}"
    usage
fi

# Convert description to kebab-case
DESCRIPTION=$(echo "$DESCRIPTION" | tr '[:upper:]' '[:lower:]' | tr '_' '-' | tr ' ' '-')

# Create branch name
BRANCH_NAME="${TYPE}/${DESCRIPTION}"

echo -e "${BLUE}Creating new branch...${NC}"
echo ""

# Ensure we're on main and it's up to date
echo -e "${YELLOW}→${NC} Switching to main branch..."
git checkout main

echo -e "${YELLOW}→${NC} Pulling latest changes..."
git pull origin main

# Create and checkout new branch
echo -e "${YELLOW}→${NC} Creating branch: ${GREEN}${BRANCH_NAME}${NC}"
git checkout -b "$BRANCH_NAME"

echo ""
echo -e "${GREEN}✓${NC} Branch created successfully!"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo "  1. Make your changes"
echo "  2. Commit with: git commit -m \"${TYPE}: your commit message\""
echo "  3. Push with: git push origin ${BRANCH_NAME}"
echo "  4. Create a Pull Request on GitHub"
echo ""
echo -e "${YELLOW}Important:${NC} Direct pushes to 'main' are not allowed."
echo "All changes must go through Pull Requests with CI/CD checks."

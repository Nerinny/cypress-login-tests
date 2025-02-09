FROM cypress/included:latest

# Set working directory
WORKDIR /e2e

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the test files
COPY . .

# Run Cypress tests
CMD ["cypress", "run"]
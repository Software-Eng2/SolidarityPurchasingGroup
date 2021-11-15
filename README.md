# SolidarityPurchasingGroup

Repository of the group P05 for the project "Office Queue Management" of the course Software Engineering 2 2021

# Team 
1. Catalano Sofia
2. Ernesto Cristian
3. Policastro Francesco
4. Vejar Pablo
5. Di Mauro Andrea
6. Inglese Lucio Rocco

# Testing

1. Install Maven
2. Go with a terminal to your project path (the one with this README file)
3. Setup SONAR_TOKEN env variable with:

Linux/Mac
```
export SONAR_TOKEN=value
```
Windows
```
setx SONAR_TOKEN value
```

4. Execute the following command:
```
mvn verify org.sonarsource.scanner.maven:sonar-maven-plugin:sonar -Dsonar.projectKey=sofia-catalano_SolidarityPurchasingGroup
```

# Coverage

Run the following command inside:
```
CI=true npm test -- --coverage --testResultsProcessor=jest-sonar-reporter
```
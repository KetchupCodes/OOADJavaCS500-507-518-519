import java.util.*;
class Employee {
    protected String name;
    protected int employeeID;
    protected String department;

    public Employee(String name, int employeeID, String department) {
        this.name = name;
        this.employeeID = employeeID;
        this.department = department;
    }

    public void work() {
        System.out.println(name + " with employee ID " + employeeID + " works in " + department);
    }
}

class Manager extends Employee {
    private String teamName;

    public Manager(String name, int employeeID, String department, String teamName) {
        super(name, employeeID, department);
        this.teamName = teamName;
    }

    public void work() {
        super.work();
        System.out.println(name + " manages the " + teamName + " team in " + department);
    }
}

class Developer extends Employee {
    private String projectName;

    public Developer(String name, int employeeID, String department, String projectName) {
        super(name, employeeID, department);
        this.projectName = projectName;
    }

    public void work() {
        super.work();
        System.out.println(name + " is coding " + projectName + " project in " + department);
    }
}


public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        String employeeName = scanner.nextLine();
        int employeeID = scanner.nextInt();
        scanner.nextLine();
        String employeeDepartment = scanner.nextLine();

        String managerName = scanner.nextLine();
        int managerID = scanner.nextInt();
        scanner.nextLine();
        String managerDepartment = scanner.nextLine();
        String teamName = scanner.nextLine();

        String developerName = scanner.nextLine();
        int developerID = scanner.nextInt();
        scanner.nextLine();
        String developerDepartment = scanner.nextLine();
        String projectName = scanner.nextLine();

        Employee employee = new Employee(employeeName, employeeID, employeeDepartment);
        Manager manager = new Manager(managerName, managerID, managerDepartment, teamName);
        Developer developer = new Developer(developerName, developerID, developerDepartment, projectName);

        employee.work();
        manager.work();
        developer.work();

        System.out.println("fin");

        scanner.close();
    }
}

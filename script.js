/* ── EXPERIMENTS DATA ────────────────────────────────────────────────────── */
/*
  SINGLE-CODE experiment shape:
  {
    id: 1,
    expNum: 1,
    subLabel: "Part 1 / 2",     // optional
    title: "Experiment Title",
    assignment: "Experiment N: Full Title",
    desc: "Short description.",
    lang: "Java",
    code: `...java code...`
  }

  MULTI-CODE experiment shape (e.g. Java + SQL tabs):
  {
    id: 4,
    expNum: 4,
    title: "Experiment Title",
    assignment: "Experiment 4: Full Title",
    desc: "Short description.",
    codes: [
      { label: "Java", lang: "Java", code: `...java code...` },
      { label: "SQL",  lang: "SQL",  code: `...sql queries...` }
    ]
  }
*/
const experiments = [
  {
    id: 1, expNum: 1,
    title: "Key Listener (Applet)",
    assignment: "Experiment 1: Applet — Key Listener",
    pdfUrl: null,
    desc: "Demonstrates KeyListener interface on a TextArea inside an AWT Frame. Labels update on key pressed, released, and typed events.",
    lang: "Java",
    code: `import java.awt.*;
import java.awt.event.*;

public class KeyListener_Example extends Frame implements KeyListener {

    Label l;
    TextArea area;

    KeyListener_Example() {

        l = new Label();
        l.setBounds(20, 50, 100, 20);

        area = new TextArea();
        area.setBounds(20, 80, 300, 300);

        area.addKeyListener(this);

        add(l);
        add(area);

        setSize(400, 400);
        setLayout(null);
        setVisible(true);

        addWindowListener(new WindowAdapter() {
            public void windowClosing(WindowEvent e) {
                dispose();
            }
        });
    }

    public void keyPressed(KeyEvent e) {
        l.setText("Key Pressed");
    }

    public void keyReleased(KeyEvent e) {
        l.setText("Key Released");
    }

    public void keyTyped(KeyEvent e) {
        l.setText("Key Typed");
    }

    public static void main(String[] args) {
        new KeyListener_Example();
    }
}`
  },
  {
    id: 2, expNum: 2,
    title: "Mouse Listener",
    assignment: "Experiment 2: Mouse Listener",
    pdfUrl: "files/EXP 2 Mouse listner (2).pdf",
    desc: "Implements MouseListener on an AWT Frame. A Label reflects mouseClicked, mouseEntered, mouseExited, mousePressed, and mouseReleased events.",
    lang: "Java",
    code: `import java.awt.*;
import java.awt.event.*;

public class MouseListeners extends Frame implements MouseListener {

    Label l;

    MouseListeners() {

        addMouseListener(this);

        l = new Label();
        l.setBounds(20, 50, 100, 20);

        add(l);

        setSize(300, 300);
        setLayout(null);
        setVisible(true);

        addWindowListener(new WindowAdapter() {
            public void windowClosing(WindowEvent e) {
                dispose();
            }
        });
    }

    public void mouseClicked(MouseEvent e) {
        l.setText("Mouse Clicked");
    }

    public void mouseEntered(MouseEvent e) {
        l.setText("Mouse Entered");
    }

    public void mouseExited(MouseEvent e) {
        l.setText("Mouse Exited");
    }

    public void mousePressed(MouseEvent e) {
        l.setText("Mouse Pressed");
    }

    public void mouseReleased(MouseEvent e) {
        l.setText("Mouse Released");
    }

    public static void main(String[] args) {
        new MouseListeners();
    }
}`
  },
  {
    id: 3, expNum: 3,
    title: "GUI",
    assignment: "Experiment 3: GUI",
    pdfUrl: "files/EXP3.pdf",
    desc: "Code coming soon — will be added once the experiment writeup is shared.",
    lang: "Java",
    code: `// Code will be added here`
  },
  {
    id: 4, expNum: 4,
    title: "JDBC — Insert & Retrieve from MySQL",
    assignment: "Experiment 4: JDBC (Java Database Connectivity)",
    pdfUrl: "files/EXP 4 JDBC.pdf",
    desc: "Connects to MySQL via DriverManager, inserts a row using PreparedStatement, then retrieves and prints all rows from the Players table.",
    codes: [
      {
        label: "Java", lang: "Java",
        code: `package jdbc;

import java.sql.Connection;
import java.sql.Date;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class JDBC {

    public static void main(String args[]) throws SQLException {

        // Getting the connection
        String mysqlUrl = "jdbc:mysql://localhost:3306/testdb2";

        Connection con = DriverManager.getConnection(mysqlUrl, "root", "entc@123");

        System.out.println("Connection established......");

        // Creating the Statement
        Statement stmt = con.createStatement();

        // Insert a row into the Players table
        PreparedStatement pstmt = con.prepareStatement(
                "INSERT INTO Players values (?, ?, ?, ?, ?, ?)");

        pstmt.setInt(1, 10);
        pstmt.setString(2, "Abhay");
        pstmt.setString(3, "Chindhe");
        pstmt.setDate(4, new Date(513596800000L));
        pstmt.setString(5, "Ahilyanagar");
        pstmt.setString(6, "India");

        pstmt.executeUpdate();

        // Query to retrieve records
        String query = "Select * from Players";

        // Executing the query
        ResultSet rs = stmt.executeQuery(query);

        while (rs.next()) {

            int id = rs.getInt("ID");
            String first_name = rs.getString("First_Name");
            String last_name = rs.getString("Last_Name");
            Date date_of_birth = rs.getDate("Date_Of_Birth");
            String place_of_birth = rs.getString("Place_Of_Birth");
            String country = rs.getString("Country");

            System.out.print("Id: " + id + ", ");
            System.out.print("First Name: " + first_name + ", ");
            System.out.print("Last Name: " + last_name + ", ");
            System.out.print("Date Of Birth: " + date_of_birth + ", ");
            System.out.print("Place Of Birth: " + place_of_birth + ", ");
            System.out.print("Country: " + country);

            System.out.println(" ");
        }

        con.close();
    }
}`
      },
      {
        label: "MySQL", lang: "SQL",
        code: `DROP DATABASE IF EXISTS testdb2;
CREATE DATABASE testdb2;
USE testdb2;

CREATE TABLE Players (
    ID             INT,
    First_Name     VARCHAR(255),
    Last_Name      VARCHAR(255),
    Date_Of_Birth  DATE,
    Place_Of_Birth VARCHAR(255),
    Country        VARCHAR(255),
    PRIMARY KEY (ID)
);

INSERT INTO Players VALUES (1, 'Shikhar',   'Dhawan',     DATE('1981-12-05'), 'Delhi',    'India');
INSERT INTO Players VALUES (2, 'Jonathan',  'Trott',      DATE('1981-04-22'), 'CapeTown', 'SouthAfrica');
INSERT INTO Players VALUES (3, 'Kumara',    'Sangakkara', DATE('1977-10-27'), 'Matale',   'Srilanka');
INSERT INTO Players VALUES (4, 'Virat',     'Kohli',      DATE('1988-11-05'), 'Delhi',    'India');
INSERT INTO Players VALUES (5, 'Rohit',     'Sharma',     DATE('1987-04-30'), 'Nagpur',   'India');
INSERT INTO Players VALUES (6, 'Ravindra',  'Jadeja',     DATE('1988-12-06'), 'Nagpur',   'India');
INSERT INTO Players VALUES (7, 'James',     'Anderson',   DATE('1982-06-30'), 'Burnley',  'England');

SELECT * FROM Players;`
      }
    ]
  },
  {
    id: 5, expNum: 5,
    title: "RMI — Palindrome Checker",
    assignment: "Experiment 5: RMI (Remote Method Invocation) — Palindrome",
    pdfUrl: "files/EXP 5 RMI (Palindrome).pdf",
    desc: "Three-file RMI setup: a Remote interface, a Server that registers on port 9999, and a Client that invokes the palindrome check remotely.",
    codes: [
      {
        label: "Interface", lang: "Java",
        code: `import java.rmi.Remote;
import java.rmi.RemoteException;

public interface PalindromeChecker extends Remote {

    public boolean checkPalindrome(String s) throws RemoteException;

}`
      },
      {
        label: "Server", lang: "Java",
        code: `import java.rmi.registry.Registry;
import java.rmi.registry.LocateRegistry;
import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;

public class PalindromeServer extends UnicastRemoteObject implements PalindromeChecker {

    public PalindromeServer() throws RemoteException {
        super();
    }

    @Override
    public boolean checkPalindrome(String s) throws RemoteException {

        // remove all non-alphanumeric characters and convert to lowercase
        String cleanString = s.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();

        // reverse string
        String reversedString = new StringBuilder(cleanString).reverse().toString();

        return cleanString.equals(reversedString);
    }

    public static void main(String[] args) {

        try {

            Registry registry = LocateRegistry.createRegistry(9999);

            registry.rebind("PalindromeChecker", new PalindromeServer());

            System.out.println("PalindromeChecker server ready.");

        } catch (RemoteException e) {

            System.out.println("exception " + e);

        }
    }
}`
      },
      {
        label: "Client", lang: "Java",
        code: `import java.rmi.registry.Registry;
import java.rmi.registry.LocateRegistry;

public class PalindromeClient {

    public static void main(String[] args) {

        try {

            Registry registry = LocateRegistry.getRegistry("localhost", 9999);

            PalindromeChecker checker =
                (PalindromeChecker) registry.lookup("PalindromeChecker");

            String[] testWords = { "racecar", "hello", "madam", "world", "level" };

            for (String word : testWords) {
                System.out.println(word + " -> " + checker.checkPalindrome(word));
            }

        } catch (Exception e) {

            System.out.println("exception " + e);

        }
    }
}`
      }
    ]
  },
  {
    id: 6, expNum: 6, subLabel: "HTTP",
    title: "InetAddress — Hostname & Reverse Lookup",
    assignment: "Experiment 6: HTTP — InetAddress",
    pdfUrl: "files/EXP 6 IPADRESS.pdf",
    desc: "Two utilities: InetADRESS resolves a hostname to its IP address; InetAddressReverse performs reverse DNS to get the hostname from an IP.",
    codes: [
      {
        label: "InetADRESS", lang: "Java",
        code: `import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.Scanner;

public class InetADRESS {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        System.out.println("Enter Host Name");

        String host = sc.next();

        try {

            // Get InetAddress object
            InetAddress ip = InetAddress.getByName(host);

            System.out.println("IP Address is: "
                    + ip.getHostAddress());

        } catch (UnknownHostException e) {

            System.out.println("Error: "
                    + e.getMessage());
        }

        sc.close();
    }
}`
      },
      {
        label: "InetAddressReverse", lang: "Java",
        code: `import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.Scanner;

public class InetAddressReverse {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        System.out.println("Enter IP Address:");

        String ipInput = sc.next();

        try {

            InetAddress ip =
                    InetAddress.getByName(ipInput);

            // Fetch host name from IP
            System.out.println("Host Name is: "
                    + ip.getHostName());

        } catch (UnknownHostException e) {

            System.out.println("Invalid IP Address: "
                    + e.getMessage());
        }

        sc.close();
    }
}`
      }
    ]
  },
  {
    id: 7, expNum: 7,
    title: "Servlets — Login & Validation",
    assignment: "Experiment 7: Servlets",
    pdfUrl: "files/exp 7.pdf",
    desc: "Three-file Servlet project: an HTML login form, a Java Servlet that validates credentials and dispatches, and a Welcome HTML page.",
    codes: [
      {
        label: "index.html", lang: "HTML",
        code: `<!DOCTYPE html>
<html>
<head>
    <title>Login Page</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>

<form action="valid" method="post">

    Enter UserName :
    <input type="text" name="uname" />
    <br><br>

    Enter Password :
    <input type="password" name="upass" />
    <br><br>

    <input type="submit" value="Login" />

</form>

</body>
</html>`
      },
      {
        label: "valid.java", lang: "Java",
        code: `import java.io.IOException;
import java.io.PrintWriter;

import jakarta.servlet.ServletException;
import jakarta.servlet.RequestDispatcher;

import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class valid extends HttpServlet {

    protected void processRequest(HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("text/html;charset=UTF-8");

        try (PrintWriter out = response.getWriter()) {

            String uname = request.getParameter("uname");
            String upass = request.getParameter("upass");

            if (upass.equals("password123")) {

                RequestDispatcher reqDisp =
                        request.getRequestDispatcher("/Welcome.html");

                reqDisp.forward(request, response);

            } else {

                out.println("Sorry username or password error");

                RequestDispatcher reqDisp =
                        request.getRequestDispatcher("/index.html");

                reqDisp.include(request, response);
            }
        }
    }

    @Override
    protected void doGet(HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        processRequest(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        processRequest(request, response);
    }

    @Override
    public String getServletInfo() {
        return "Short description";
    }
}`
      },
      {
        label: "Welcome.html", lang: "HTML",
        code: `<!DOCTYPE html>
<html>
<head>
    <title>Welcome</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>

<h1>Welcome to the page</h1>

Login Confirmed!!

</body>
</html>`
      }
    ]
  },
  {
    id: 8, expNum: 8,
    title: "RMI — Calculator",
    assignment: "Experiment 8: RMI Calculator",
    pdfUrl: "files/EXP 8 RMI (Addition).pdf",
    desc: "Four-file RMI Calculator: a Remote interface, an implementation, a Server that binds on port 1099, and a Client that calls add() and subtract().",
    codes: [
      {
        label: "Interface", lang: "Java",
        code: `import java.rmi.Remote;
import java.rmi.RemoteException;

public interface Calculator extends Remote {

    int add(int x, int y) throws RemoteException;

    int subtract(int x, int y) throws RemoteException;
}`
      },
      {
        label: "Impl", lang: "Java",
        code: `import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;

public class CalculatorImpl extends UnicastRemoteObject
        implements Calculator {

    public CalculatorImpl() throws RemoteException {

        super();
    }

    public int add(int x, int y) throws RemoteException {

        return x + y;
    }

    public int subtract(int x, int y) throws RemoteException {

        return x - y;
    }
}`
      },
      {
        label: "Server", lang: "Java",
        code: `import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;

public class CalculatorServer {

    public static void main(String[] args) {

        try {

            // Create remote object
            Calculator calculator = new CalculatorImpl();

            // Create registry
            Registry registry =
                    LocateRegistry.createRegistry(1099);

            // Bind object
            registry.rebind("Calculator", calculator);

            System.out.println("CalculatorServer ready.");

        } catch (RemoteException e) {

            System.err.println("CalculatorServer exception: " + e);
        }
    }
}`
      },
      {
        label: "Client", lang: "Java",
        code: `import java.rmi.NotBoundException;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;

public class CalculatorClient {

    public static void main(String[] args) {

        try {

            // Get registry
            Registry registry =
                    LocateRegistry.getRegistry("localhost");

            // Lookup remote object
            Calculator calculator =
                    (Calculator) registry.lookup("Calculator");

            // Call methods
            int result = calculator.add(1, 2);

            System.out.println("1 + 2 = " + result);

            result = calculator.subtract(5, 3);

            System.out.println("5 - 3 = " + result);

        } catch (RemoteException | NotBoundException e) {

            System.out.println("Client exception: " + e);
        }
    }
}`
      }
    ]
  },
  {
    id: 9, expNum: 9,
    title: "JSP — Current Date & Time",
    assignment: "Experiment 9: JSP Page",
    pdfUrl: "files/EXP 9.pdf",
    desc: "A simple JSP page that imports java.util.Date and prints the current date, time, and day using a scriptlet with out.println().",
    lang: "JSP",
    code: `<%@ page import="java.util.Date" %>
<html>
<head>
    <title>Current Date and Time</title>
</head>
<body>
    <h1>Welcome to the Advance Java</h1>
    <h3>Current Date, Time and Day</h3>

<%
    Date d = new Date();
    out.println(d);
%>

</body>
</html>`
  },

  /* ── EXP 10 — Cookies ──────────────────────────────────────────────────── */
  {
    id: 10, expNum: 10, subLabel: "Cookies (1/3)",
    title: "Servlet Cookie — Login, Profile & Logout",
    assignment: "Experiment 10: Session Tracking — Cookies",
    pdfUrl: "files/EXP 10.1 Session management using Cookies - Copy - Copy (1).pdf",
    desc: "Cookie-based login flow: LoginServlet sets a cookie on success, ProfileServlet reads it, LogoutServlet expires it. Password: admin123",
    codes: [
      {
        label: "index.html", lang: "HTML",
        code: `<!DOCTYPE html>
<html>
<head>
    <meta charset="ISO-8859-1">
    <title>Servlet Login Example</title>
</head>
<body>
    <h1>Welcome to Login App by Cookie</h1>
    <a href="login.html">Login</a> |
    <a href="LogoutServlet">Logout</a> |
    <a href="ProfileServlet">Profile</a>
</body>
</html>`
      },
      {
        label: "login.html", lang: "HTML",
        code: `<!DOCTYPE html>
<html>
<head>
    <meta charset="ISO-8859-1">
    <title>Login Form</title>
</head>
<body>
    <form action="LoginServlet" method="post">
        Name:
        <input type="text" name="name">
        <br><br>
        Password:
        <input type="password" name="password">
        <br><br>
        <input type="submit" value="Login">
    </form>
</body>
</html>`
      },
      {
        label: "link.html", lang: "HTML",
        code: `<a href="login.html">Login</a> |
<a href="LogoutServlet">Logout</a> |
<a href="ProfileServlet">Profile</a>
<hr>`
      },
      {
        label: "LoginServlet", lang: "Java",
        code: `import java.io.IOException;
import java.io.PrintWriter;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/LoginServlet")

public class LoginServlet extends HttpServlet {

    protected void doPost(HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("text/html");

        PrintWriter out = response.getWriter();

        request.getRequestDispatcher("link.html")
                .include(request, response);

        String name = request.getParameter("name");
        String password = request.getParameter("password");

        if ("admin123".equals(password)) {

            out.print("You are successfully logged in!");
            out.print("<br>Welcome, " + name);

            Cookie ck = new Cookie("name", name);
            response.addCookie(ck);

        } else {

            out.print("Sorry, username or password error!");

            request.getRequestDispatcher("login.html")
                    .include(request, response);
        }

        out.close();
    }
}`
      },
      {
        label: "ProfileServlet", lang: "Java",
        code: `import java.io.IOException;
import java.io.PrintWriter;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/ProfileServlet")

public class ProfileServlet extends HttpServlet {

    protected void doGet(HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("text/html");

        PrintWriter out = response.getWriter();

        request.getRequestDispatcher("link.html")
                .include(request, response);

        Cookie ck[] = request.getCookies();

        if (ck != null) {

            boolean found = false;

            for (Cookie c : ck) {

                if (c.getName().equals("name")) {

                    out.print("<b>Welcome to Profile</b>");
                    out.print("<br>Welcome, " + c.getValue());
                    found = true;
                }
            }

            if (!found) {
                out.print("Please login first");
                request.getRequestDispatcher("login.html")
                        .include(request, response);
            }

        } else {

            out.print("Please login first");
            request.getRequestDispatcher("login.html")
                    .include(request, response);
        }

        out.close();
    }
}`
      },
      {
        label: "LogoutServlet", lang: "Java",
        code: `import java.io.IOException;
import java.io.PrintWriter;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/LogoutServlet")

public class LogoutServlet extends HttpServlet {

    protected void doGet(HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("text/html");

        PrintWriter out = response.getWriter();

        request.getRequestDispatcher("link.html")
                .include(request, response);

        Cookie ck = new Cookie("name", "");
        ck.setMaxAge(0);
        response.addCookie(ck);

        out.print("You are successfully logged out!");

        out.close();
    }
}`
      }
    ]
  },

  /* ── EXP 10 — HTTP / URL Rewriting ─────────────────────────────────────── */
  {
    id: 11, expNum: 10, subLabel: "HTTP / URL Rewriting (2/3)",
    title: "Servlet HTTP — URL Rewriting Session",
    assignment: "Experiment 10: Session Tracking — URL Rewriting",
    pdfUrl: "files/EXP 10.2 Session management using URLRewiting - Copy.pdf",
    desc: "URL Rewriting example: FirstServlet appends the username to a hyperlink URL; SecondServlet reads it from the query string.",
    codes: [
      {
        label: "index.html", lang: "HTML",
        code: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>First Servlet Form</title>
</head>
<body>
    <form action="FirstServlet" method="get">
        Name:
        <input type="text" name="userName"/>
        <br><br>
        <input type="submit" value="Submit"/>
    </form>
</body>
</html>`
      },
      {
        label: "FirstServlet", lang: "Java",
        code: `import java.io.*;

import jakarta.servlet.*;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;

@WebServlet("/FirstServlet")

public class FirstServlet extends HttpServlet {

    public void doGet(HttpServletRequest request,
            HttpServletResponse response) {

        try {

            response.setContentType("text/html");

            PrintWriter out = response.getWriter();

            String n = request.getParameter("userName");

            out.print("Welcome " + n);

            // URL Rewriting
            out.print("<br><a href='SecondServlet?uname="
                    + n + "'>Visit</a>");

            out.close();

        } catch (Exception e) {

            System.out.println(e);
        }
    }
}`
      },
      {
        label: "SecondServlet", lang: "Java",
        code: `import java.io.*;

import jakarta.servlet.*;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;

@WebServlet("/SecondServlet")

public class SecondServlet extends HttpServlet {

    public void doGet(HttpServletRequest request,
            HttpServletResponse response) {

        try {

            response.setContentType("text/html");

            PrintWriter out = response.getWriter();

            // getting value from query string
            String n = request.getParameter("uname");

            out.print("Hello " + n);

            out.close();

        } catch (Exception e) {

            System.out.println(e);
        }
    }
}`
      }
    ]
  },

  /* ── EXP 10 — Session Tracking (HttpSession) ────────────────────────────── */
  {
    id: 12, expNum: 10, subLabel: "Session Tracking (3/3)",
    title: "Servlet HttpSession — Login, Profile & Logout",
    assignment: "Experiment 10: Session Tracking — HttpSession",
    pdfUrl: "files/EXP 10.3 Session management using HTTP Session.pdf",
    desc: "HttpSession-based login: LoginServlet stores name in session, ProfileServlet retrieves it, LogoutServlet invalidates the session. Password: admin123",
    codes: [
      {
        label: "link.html", lang: "HTML",
        code: `<a href="login.html">Login</a> |
<a href="LogoutServlet">Logout</a> |
<a href="ProfileServlet">Profile</a>
<hr>`
      },
      {
        label: "LoginServlet", lang: "Java",
        code: `import java.io.IOException;
import java.io.PrintWriter;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;

import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@WebServlet("/LoginServlet")

public class LoginServlet extends HttpServlet {

    protected void doPost(HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("text/html");

        PrintWriter out = response.getWriter();

        request.getRequestDispatcher("link.html")
                .include(request, response);

        String name = request.getParameter("name");
        String password = request.getParameter("password");

        if ("admin123".equals(password)) {

            out.print("Welcome, " + name);

            HttpSession session = request.getSession();
            session.setAttribute("name", name);

        } else {

            out.print("Sorry, username or password error!");

            request.getRequestDispatcher("login.html")
                    .include(request, response);
        }

        out.close();
    }
}`
      },
      {
        label: "ProfileServlet", lang: "Java",
        code: `import java.io.IOException;
import java.io.PrintWriter;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;

import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@WebServlet("/ProfileServlet")

public class ProfileServlet extends HttpServlet {

    protected void doGet(HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("text/html");

        PrintWriter out = response.getWriter();

        request.getRequestDispatcher("link.html")
                .include(request, response);

        HttpSession session = request.getSession(false);

        if (session != null) {

            String name = (String) session.getAttribute("name");

            out.print("Hello, " + name +
                    " Welcome to Profile");

        } else {

            out.print("Please login first");

            request.getRequestDispatcher("login.html")
                    .include(request, response);
        }

        out.close();
    }
}`
      },
      {
        label: "LogoutServlet", lang: "Java",
        code: `import java.io.IOException;
import java.io.PrintWriter;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;

import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@WebServlet("/LogoutServlet")

public class LogoutServlet extends HttpServlet {

    protected void doGet(HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("text/html");

        PrintWriter out = response.getWriter();

        request.getRequestDispatcher("link.html")
                .include(request, response);

        HttpSession session = request.getSession(false);

        if (session != null) {
            session.invalidate();
        }

        out.print("You are successfully logged out!");

        out.close();
    }
}`
      }
    ]
  },
];

/* ── SYNTAX HIGHLIGHTERS ─────────────────────────────────────────────────── */
function escHtml(s){
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function highlightJava(code){
  const e = escHtml(code);
  return e
    .replace(/(\/\/[^\n]*)/g,"<span class='cm'>$1</span>")
    .replace(/(\/\*[\s\S]*?\*\/)/g,"<span class='cm'>$1</span>")
    .replace(/"([^"]*)"/g,"<span class='str'>\"$1\"</span>")
    .replace(/'(\\?.)'(?!')/g,"<span class='str'>'$1'</span>")
    .replace(/(@\w+)/g,"<span class='an'>$1</span>")
    .replace(/\b(abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|native|new|package|private|protected|public|return|short|static|strictfp|super|switch|synchronized|this|throw|throws|transient|try|var|void|volatile|while|record|sealed|permits|yield)\b/g,"<span class='kw'>$1</span>")
    .replace(/\b(String|System|Math|Object|Integer|Double|Boolean|Long|Float|Byte|Short|Character|Void|Number|Thread|Runnable|Exception|RuntimeException|IllegalArgumentException|NullPointerException|ArrayList|LinkedList|HashMap|HashSet|TreeMap|TreeSet|List|Map|Set|Queue|Stack|Scanner|BufferedReader|InputStreamReader|PrintWriter|InputStream|OutputStream|File|Path|Optional|Stream|Collectors|Arrays|Collections|Connection|DriverManager|Statement|PreparedStatement|ResultSet|SQLException)\b/g,"<span class='cl'>$1</span>")
    .replace(/\b(0x[0-9A-Fa-f]+|\d+\.?\d*[fFdDlL]?)\b/g,"<span class='num'>$1</span>");
}

function highlightSQL(code){
  const e = escHtml(code);
  return e
    // comments
    .replace(/(--[^\n]*)/g,"<span class='cm'>$1</span>")
    .replace(/(\/\*[\s\S]*?\*\/)/g,"<span class='cm'>$1</span>")
    // strings
    .replace(/'([^']*)'/g,"<span class='str'>'$1'</span>")
    // keywords
    .replace(/\b(SELECT|FROM|WHERE|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|TABLE|DATABASE|DROP|ALTER|ADD|COLUMN|PRIMARY|KEY|FOREIGN|REFERENCES|JOIN|LEFT|RIGHT|INNER|OUTER|ON|AS|AND|OR|NOT|IN|IS|NULL|LIKE|BETWEEN|ORDER|BY|GROUP|HAVING|DISTINCT|COUNT|SUM|AVG|MIN|MAX|LIMIT|OFFSET|INDEX|UNIQUE|DEFAULT|AUTO_INCREMENT|VARCHAR|INT|INTEGER|BIGINT|FLOAT|DOUBLE|BOOLEAN|DATE|DATETIME|TIMESTAMP|TEXT|CHAR|CONSTRAINT|USE|SHOW|DESCRIBE|TRUNCATE|BEGIN|COMMIT|ROLLBACK|TRANSACTION|IF|EXISTS|UNION|ALL|CASE|WHEN|THEN|ELSE|END)\b/gi,"<span class='kw sql-kw'>$1</span>")
    // numbers
    .replace(/\b(\d+\.?\d*)\b/g,"<span class='num'>$1</span>");
}

function highlightHTML(code){
  const e = escHtml(code);
  return e
    // comments
    .replace(/(&lt;!--[\s\S]*?--&gt;)/g,"<span class='cm'>$1</span>")
    // doctype
    .replace(/(&lt;!DOCTYPE[^&]*&gt;)/gi,"<span class='an'>$1</span>")
    // tags
    .replace(/(&lt;\/?)(\w[\w-]*)([^&]*?)(\/? *&gt;)/g, (m, open, tag, attrs, close) => {
      const coloredAttrs = attrs.replace(/(\w[\w-]*)=("[^"]*")/g,
        "<span class='an'>$1</span>=<span class='str'>$2</span>");
      return `<span class='kw'>${open}${tag}</span>${coloredAttrs}<span class='kw'>${close}</span>`;
    })
    // scriptlet tags for JSP
    .replace(/(&lt;%[\s\S]*?%&gt;)/g, blk => {
      const inner = blk
        .replace(/(&lt;%[=@]?|%&gt;)/g, "<span class='an'>$1</span>")
        .replace(/\b(Date|out|request|response|session|application|config|pageContext|page|exception)\b/g,"<span class='cl'>$1</span>")
        .replace(/\b(new|import|String|int|void|if|else|for|while|return)\b/g,"<span class='kw'>$1</span>")
        .replace(/'([^']*)'/g,"<span class='str'>'$1'</span>");
      return inner;
    });
}

function autoHighlight(code, lang){
  const l = (lang || '').toLowerCase();
  if(l === 'sql') return highlightSQL(code);
  if(l === 'html' || l === 'jsp') return highlightHTML(code);
  return highlightJava(code);
}

/* ── CARD FACTORY ────────────────────────────────────────────────────────── */
const grid      = document.getElementById('experimentsGrid');
const noResults = document.getElementById('noResults');
const noQuery   = document.getElementById('noResultsQuery');
const countEl   = document.getElementById('resultCount');

/* Normalise: ensure every exp has a `codes` array internally */
function normaliseCodes(exp){
  if(exp.codes) return exp.codes;
  return [{ label: exp.lang || 'Java', lang: exp.lang || 'Java', code: exp.code }];
}

function createCard(exp, delayMs){
  const card = document.createElement('article');
  card.className = 'exp-card';
  card.style.animationDelay = delayMs + 'ms';

  const codes    = normaliseCodes(exp);
  const isMulti  = codes.length > 1;
  const subBadge = exp.subLabel ? `<span class="sub-label">${exp.subLabel}</span>` : '';

  /* Build tab buttons HTML (only rendered when multi-code) */
  const tabsHtml = isMulti
    ? `<div class="code-tabs" role="tablist">
        ${codes.map((c, i) => `
          <button
            class="code-tab${i === 0 ? ' active' : ''}"
            role="tab"
            data-tab="${i}"
            aria-selected="${i === 0}"
            aria-label="View ${c.label} code"
          >
            <span class="tab-dot tab-dot--${(c.lang||'java').toLowerCase()}"></span>
            ${escHtml(c.label)}
          </button>`).join('')}
       </div>`
    : '';

  /* Build code panels HTML */
  const panelsHtml = codes.map((c, i) => `
    <div class="code-panel${i === 0 ? ' active' : ''}" data-panel="${i}">
      <span class="code-lang-tag">${escHtml(c.lang || c.label)}</span>
      <pre class="code-block">${autoHighlight(c.code, c.lang)}</pre>
    </div>`).join('');

  card.innerHTML = `
    <div class="card-header">
      <div class="card-meta">
        <div class="exp-badge"><span class="dot"></span>EXP ${String(exp.expNum).padStart(2,'0')}${subBadge}</div>
        <div class="card-assignment">${escHtml(exp.assignment)}</div>
        <div class="card-title">${escHtml(exp.title)}</div>
        <div class="card-desc">${escHtml(exp.desc)}</div>
      </div>
      <div class="card-actions">
        <button class="copy-btn" aria-label="Copy code">
          <i class="fa-regular fa-copy"></i>
          <span class="btn-label">Copy</span>
        </button>
        <button class="pdf-btn" aria-label="Download PDF">
          <i class="fa-solid fa-file-arrow-down"></i>
          <span class="btn-label">PDF</span>
        </button>
      </div>
    </div>
    <div class="code-wrapper">
      ${tabsHtml}
      <div class="code-panels">${panelsHtml}</div>
    </div>`;

  /* ── Tab switching ─────────────────────────────────────────────────────── */
  let activeTab = 0;

  if(isMulti){
    const tabBtns = card.querySelectorAll('.code-tab');
    const panels  = card.querySelectorAll('.code-panel');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.tab, 10);
        if(idx === activeTab) return;

        /* Slide out current panel */
        panels[activeTab].classList.remove('active');
        panels[activeTab].classList.add('exit');
        tabBtns[activeTab].classList.remove('active');
        tabBtns[activeTab].setAttribute('aria-selected','false');

        setTimeout(() => panels[activeTab].classList.remove('exit'), 280);

        activeTab = idx;

        /* Slide in new panel */
        panels[activeTab].classList.add('active');
        tabBtns[activeTab].classList.add('active');
        tabBtns[activeTab].setAttribute('aria-selected','true');

        /* Update copy button label to reflect current tab */
        card.querySelector('.btn-label').textContent = 'Copy';
        card.querySelector('.copy-btn i').className = 'fa-regular fa-copy';
        card.querySelector('.copy-btn').classList.remove('copied');
      });
    });
  }

  /* ── Copy button ───────────────────────────────────────────────────────── */
  const btn      = card.querySelector('.copy-btn');
  const btnLabel = card.querySelector('.btn-label');
  const icon     = card.querySelector('.copy-btn i');

  btn.addEventListener('click', e => {
    /* Ripple */
    const r = document.createElement('span');
    r.className = 'ripple';
    const rect = btn.getBoundingClientRect();
    const sz = Math.max(rect.width, rect.height);
    r.style.cssText = `width:${sz}px;height:${sz}px;left:${e.clientX-rect.left-sz/2}px;top:${e.clientY-rect.top-sz/2}px`;
    btn.appendChild(r);
    r.addEventListener('animationend', () => r.remove());

    /* Always copy the currently-active tab */
    const textToCopy = codes[activeTab].code;
    const activeLabel = codes[activeTab].label;
    const codeEl = card.querySelectorAll('.code-panel')[activeTab].querySelector('.code-block');

    navigator.clipboard.writeText(textToCopy).then(() => {
      btn.classList.add('copied');
      icon.className = 'fa-solid fa-check';
      btnLabel.textContent = 'Copied!';
      codeEl.classList.add('flash');
      setTimeout(() => codeEl.classList.remove('flash'), 600);
      showToast(`${activeLabel} code copied!`, 'success');
      setTimeout(() => {
        btn.classList.remove('copied');
        icon.className = 'fa-regular fa-copy';
        btnLabel.textContent = 'Copy';
      }, 2000);
    }).catch(() => {
      showToast('Copy failed — try again', 'error');
    });
  });

  /* ── PDF Download button ───────────────────────────────────────────────── */
  const pdfBtn   = card.querySelector('.pdf-btn');
  const pdfLabel = pdfBtn.querySelector('.btn-label');
  const pdfIcon  = pdfBtn.querySelector('i');

  /* If no PDF file at all, dim the button */
  if(!exp.pdfUrl){
    pdfBtn.classList.add('pdf-unavailable');
    pdfBtn.title = 'No PDF available for this experiment yet';
  }

  pdfBtn.addEventListener('click', () => {
    /* ── Priority 1: real file download ── */
    if(exp.pdfUrl){
      const a = document.createElement('a');
      a.href     = exp.pdfUrl;
      a.download = exp.pdfUrl.split('/').pop();   // use the actual filename
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      /* Visual feedback */
      pdfBtn.classList.add('pdf-downloading');
      pdfIcon.className      = 'fa-solid fa-check';
      pdfLabel.textContent   = 'Done!';
      showToast(`PDF downloaded!`, 'success');
      setTimeout(() => {
        pdfBtn.classList.remove('pdf-downloading');
        pdfIcon.className    = 'fa-solid fa-file-arrow-down';
        pdfLabel.textContent = 'PDF';
      }, 2200);
      return;
    }

    /* ── Fallback: generate PDF from code (for experiments with no file) ── */
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });

    const PW  = doc.internal.pageSize.getWidth();
    const PH  = doc.internal.pageSize.getHeight();
    const ML  = 40, MR = 40, MT = 48;
    const CW  = PW - ML - MR;
    let y = MT;

    const ASSIGN_FS = 10, DESC_FS = 10, CODE_FS = 8;
    const LINE_H    = CODE_FS * 1.55;

    function checkPage(needed=14){
      if(y + needed > PH - 32){
        doc.addPage();
        doc.setFontSize(8); doc.setTextColor(150,150,150); doc.setFont('helvetica','normal');
        doc.text(exp.assignment, ML, 24);
        y = MT;
      }
    }

    doc.setFillColor(20,22,32); doc.rect(0,0,PW,82,'F');
    doc.setFontSize(18); doc.setTextColor(251,146,60); doc.setFont('helvetica','bold');
    doc.text(exp.assignment, ML, 34);
    doc.setFontSize(16); doc.setTextColor(220,230,240); doc.setFont('helvetica','bold');
    doc.text(exp.title, ML, 54);
    doc.setFontSize(DESC_FS); doc.setTextColor(140,160,180); doc.setFont('helvetica','normal');
    const descLines = doc.splitTextToSize(exp.desc, CW);
    doc.text(descLines, ML, 70);
    y = 98 + (descLines.length > 1 ? (descLines.length-1)*DESC_FS*1.3 : 0);
    doc.setDrawColor(60,70,90); doc.setLineWidth(0.5); doc.line(ML,y,PW-MR,y); y+=14;

    codes.forEach((c,ci) => {
      checkPage(30);
      if(codes.length > 1){
        doc.setFillColor(30,36,52); doc.roundedRect(ML,y-10,CW,20,3,3,'F');
        doc.setFontSize(ASSIGN_FS); doc.setTextColor(251,146,60); doc.setFont('helvetica','bold');
        doc.text(`[ ${c.label} ]  —  ${c.lang}`, ML+8, y+4); y+=24;
      } else {
        doc.setFontSize(ASSIGN_FS); doc.setTextColor(100,160,220); doc.setFont('helvetica','bold');
        doc.text(c.lang, ML, y); y+=14;
      }
      c.code.split('\n').forEach(line => {
        checkPage(LINE_H+4);
        doc.setFillColor(13,17,23); doc.rect(ML,y-CODE_FS,CW,LINE_H,'F');
        doc.setTextColor(200,220,240); doc.setFontSize(CODE_FS); doc.setFont('courier','normal');
        doc.text(line.replace(/\t/g,'    '), ML+6, y, {maxWidth: CW-12});
        y += LINE_H;
      });
      y+=10;
      if(ci < codes.length-1){
        checkPage(20); doc.setDrawColor(50,60,80); doc.setLineWidth(0.4);
        doc.line(ML,y,PW-MR,y); y+=14;
      }
    });

    const tp = doc.internal.getNumberOfPages();
    for(let p=1;p<=tp;p++){
      doc.setPage(p); doc.setFontSize(8); doc.setTextColor(90,100,120); doc.setFont('helvetica','normal');
      doc.text(`Java Experiment Hub  ·  ${exp.assignment}`, ML, PH-16);
      doc.text(`Page ${p} / ${tp}`, PW-MR, PH-16, {align:'right'});
    }

    const filename = `Exp${String(exp.expNum).padStart(2,'0')}_${exp.title.replace(/[^a-zA-Z0-9]+/g,'_')}.pdf`;
    doc.save(filename);

    pdfBtn.classList.add('pdf-downloading');
    pdfIcon.className = 'fa-solid fa-check'; pdfLabel.textContent = 'Done!';
    showToast(`PDF downloaded: ${filename}`, 'success');
    setTimeout(() => {
      pdfBtn.classList.remove('pdf-downloading');
      pdfIcon.className = 'fa-solid fa-file-arrow-down'; pdfLabel.textContent = 'PDF';
    }, 2200);
  });

  return card;
}

/* ── RENDER ──────────────────────────────────────────────────────────────── */
function renderAll(list){
  grid.innerHTML = '';
  if(!list.length){
    noResults.hidden = false;
    countEl.textContent = '0 results';
    return;
  }
  noResults.hidden = true;
  countEl.textContent = `${list.length} experiment${list.length!==1?'s':''}`;
  list.forEach((exp, i) => grid.appendChild(createCard(exp, i * 45)));
}

/* ── SEARCH ──────────────────────────────────────────────────────────────── */
const searchInput = document.getElementById('searchInput');
const searchClear = document.getElementById('searchClear');

searchInput.addEventListener('input', () => {
  const q = searchInput.value.trim().toLowerCase();
  searchClear.classList.toggle('visible', q.length > 0);
  noQuery.textContent = searchInput.value.trim();
  if(!q){ renderAll(experiments); return; }
  renderAll(experiments.filter(e =>
    `exp${e.expNum} experiment${e.expNum} ${e.title} ${e.assignment} ${e.desc}`.toLowerCase().includes(q)
  ));
});

searchClear.addEventListener('click', () => {
  searchInput.value = '';
  searchClear.classList.remove('visible');
  renderAll(experiments);
  searchInput.focus();
});

/* ── TOAST ───────────────────────────────────────────────────────────────── */
const toastContainer = document.getElementById('toastContainer');
function showToast(msg, type='success'){
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  const ic = type==='success' ? 'fa-circle-check' : 'fa-circle-exclamation';
  t.innerHTML = `<i class="fa-solid ${ic} toast-icon"></i><span>${msg}</span>`;
  toastContainer.appendChild(t);
  setTimeout(() => {
    t.classList.add('hide');
    t.addEventListener('animationend', () => t.remove());
  }, 2200);
}

/* ── NAVBAR SCROLL SHADOW ────────────────────────────────────────────────── */
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

/* ── INIT ────────────────────────────────────────────────────────────────── */
renderAll(experiments);

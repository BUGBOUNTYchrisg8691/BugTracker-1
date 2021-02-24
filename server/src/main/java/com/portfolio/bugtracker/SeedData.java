package com.portfolio.bugtracker;

import com.portfolio.bugtracker.models.*;
import com.portfolio.bugtracker.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;

/**
 * The type Seed data.
 */
@Component
@Transactional
@ConditionalOnProperty(prefix = "command.line.runner", value = "enabled", havingValue = "true", matchIfMissing = true)
public class SeedData implements CommandLineRunner
{
    @Autowired
    private RoleService roleService;

    @Autowired
    private UserService userService;

    @Autowired
    private CompanyEmployeesService companyEmployeesService;

    @Autowired
    private CompanyTicketsService companyTicketsService;

    @Autowired
    private CompanyService companyService;

    @Autowired
    private TicketService ticketService;

    @Autowired
    private TicketSeveritiesService ticketSeveritiesService;

    @Autowired
    private TicketCategoriesService ticketCategoriesService;

    @Autowired
    private TicketStatusesService ticketStatusesService;

    @Autowired
    private StatusService statusService;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private SeverityService severityService;

    @Transactional

    @Override public void run(String... args) throws Exception
    {
        roleService.deleteAllRoles();
        userService.deleteAllUsers();
        companyEmployeesService.deleteAllCompanyEmployees();
        companyTicketsService.deleteAllCompanyTickets();
        companyService.deleteAllCompanies();
        ticketService.deleteAllTickets();

        Role r1 = new Role("ADMIN");
        r1 = roleService.save(r1);

        Role r2 = new Role("USER");
        r2 = roleService.save(r2);

        Role r3 = new Role("DATA");
        r3 = roleService.save(r3);

        Company c1 = new Company();
        c1.setCompanyname("Bezos Bucks");
        c1 = companyService.save(c1);

        Company c2 = new Company();
        c2.setCompanyname("Food for tha poor");
        c2 = companyService.save(c2);

        User u1 = new User();
        u1.setUsername("admin");
        u1.setPasswordEncrypt("password");
        u1.setEmail("admin@example.com");
        u1.getRoles().clear();
        u1.getRoles().add(new UserRoles(u1, r1));
        u1.getRoles().add(new UserRoles(u1, r2));
        u1.getRoles().add(new UserRoles(u1, r3));
        u1.getCompanies().add(new CompanyEmployees(c1, u1));
        u1 = userService.save(u1);
        companyEmployeesService.save(c1.getCompanyid(), u1.getUserid());

        User u2 = new User();
        u2.setUsername("user1");
        u2.setPasswordEncrypt("password");
        u2.setEmail("user1@example.com");
        u2.getRoles().clear();
        u2.getRoles().add(new UserRoles(u2, r2));
        u2.getCompanies().add(new CompanyEmployees(c1, u2));
        u2 = userService.save(u2);
        companyEmployeesService.save(c1.getCompanyid(), u2.getUserid());

        User u3 = new User();
        u3.setUsername("datauser");
        u3.setPasswordEncrypt("password");
        u3.setEmail("datauser@example.com");
        u3.getRoles().clear();
        u3.getRoles().add(new UserRoles(u3, r2));
        u3.getRoles().add(new UserRoles(u3, r3));
        u3.getCompanies().add(new CompanyEmployees(c1, u3));
        u3 = userService.save(u3);
        companyEmployeesService.save(c1.getCompanyid(), u3.getUserid());

        Ticket t1 = new Ticket();
        t1.setUser(u2);
        t1.setTitle("My first bug reported");
        t1.setDescription("I encountered my first error!");
//        t1.setStatus("In Progress");
        t1.setErrorcode("12345");
//        t1.setErrorcategory("JS");
        t1.setNotes("Here is some notes about the issue.");
        t1.setUser(u1);
        t1 = ticketService.save(t1);
        companyTicketsService.save(c1.getCompanyid(), t1.getTicketid());

        Ticket t2 = new Ticket();
        t2.setUser(u2);
        t2.setTitle("My first bug reported");
        t2.setDescription("I encountered my first error!");
        t2.setErrorcode("12345");
//        t2.setErrorcategory("JS");
        t2.setNotes("Here is some notes about the issue.");
        t2.setUser(u2);
        t2 = ticketService.save(t2);
        companyTicketsService.save(c1.getCompanyid(), t2.getTicketid());

        Ticket t3 = new Ticket();
        t3.setUser(u3);
        t3.setTitle("My first bug reported");
        t3.setDescription("I encountered my first error!");
//        t3.setStatus("In Progress");
        t3.setErrorcode("12345");
//        t3.setErrorcategory("JS");
        t3.setNotes("Here is some notes about the issue.");
        t3.setUser(u3);
        t3 = ticketService.save(t3);
        companyTicketsService.save(c1.getCompanyid(), t3.getTicketid());

        Status s1 = new Status();
        s1.setStatustype("Not started. Testing");
        s1 = statusService.save(s1);

        Category cat1 = new Category();
//        cat1.setCategoryid(20);
        cat1.setCategorytype("Testing");
        cat1 = categoryService.save(cat1);

        Severity sev1 = new Severity();
        sev1.setSeveritylevel(3);
        sev1 = severityService.save(sev1);

        TicketStatuses ts1 = new TicketStatuses(t2, s1);
//        s1.getTickets().add(ts1);
//        t2.getStatuses().add(ts1);
        ts1 = ticketStatusesService.save(ts1);

        TicketCategories tc1 = new TicketCategories(t2, cat1);
//        cat1.getTickets().add(tc1);
//        t2.getCategories().add(tc1);
        tc1 = ticketCategoriesService.save(tc1);

        TicketSeverities tsev1 = new TicketSeverities(t2, sev1);
//        sev1.getTickets().add(tsev1);
//        t2.getSeverities().add(tsev1);
        tsev1 = ticketSeveritiesService.save(tsev1);
//        ticketService.save(t2);
    }
}
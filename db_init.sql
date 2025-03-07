create database guestbook;
use guestbook;

drop table if exists entries;
create table entries(
	id int(5) auto_increment primary key,
    fname varchar(255),
    lname varchar(255),
    jobtitle varchar(255),
    company varchar(255),
    linkedin varchar(255),
    email varchar(255),
    meet varchar(20),
    other varchar(255),
    message varchar(500),
    mailing_list boolean,
    format varchar(255),
    timestamp datetime default now()
);

insert into entries (fname, lname, jobtitle, company, linkedin, email, meet, other, message, mailing_list, format)
values ('Test', 'Entry', 'QA', 'Big Corp Inc.', 'linkedin/testentry.com', 'test@bigcorp.com', 'meetup', 'text', 'Hello World', 0, 'HTML');

insert into entries (fname, lname, jobtitle, company, linkedin, email, meet, other, message, mailing_list, format)
values ('William', 'Woods', 'CEO', 'Forest Co.', 'linkedin/Willwo.com', 'test@forestco.co', 'meetup', 'text', 'text', 1, 'Text');
    
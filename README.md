### HastyMobile - User Mobile App

==============================

Getting Started

==============================

Installation:

    git clone https://github.com/SpartanSOS/HastyMobile.git

    npm i

Running tests:

    npm run test // Runs Jest

Development:

    npm i -g expo // Installs exponent cli globally.

    expo start --localhost

    expo start --localhost --dev // For dev mode and additional logging

    expo start --lan // For lan developing and use with phone

In a separate terminal tab/window, run...

    expo ios // For ios

    expo android --offline // For android offline

Release:

    expo build:ios // For build standalone app

    expo publish // To publish to exp.host

Avoid Tunnel use if possible.
Always use securely as tunnel and lan are running on network

Owners

==============================

-   Mark Boraski <mailto:mboraski@outlook.com>

Contributing

==============================

1.  Update local master to remote master `git pull --rebase origin master`!

2.  Create your feature branch: `git checkout -b HAMO-8` (jira ticket number)

3.  Commit your changes: `git commit -m 'Add some feature'`

4.  Push to the branch: `git push origin HAMO-8`

5.  Move JIRA ticket to ready for review and add link to PR in jira ticket description.

6.  Submit a pull request, the name of the branch should be the JIRA ticket. E.g. HAMO-4.

7.  Ticket will be reviewed and reviewer will assign ticket to him/herself.

8.  When review completed, the ticket will be assigned to the developer to address comments or merge PR and move ticket to done column in jira.

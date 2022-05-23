#!/usr/bin/env node

(async () => {
    try {
        
        const path = require("path");
        

        const CMA_ACCESS_TOKEN = 'DC9MG2p4CwK30mSjejjBbUUTcYW0qZ8N2o1_t5ha4gk';
        const SPACE_ID = 'wrbl18tw7jd8';
        const ENVIRONMENT_INPUT = '';
        const CONTENTFUL_PAYLOAD = " { /payload }"


        const MIGRATIONS_DIR = path.join(".", "migrations");

        const client = createClient({
            accessToken: CMA_ACCESS_TOKEN,
        });
        const space = await client.getSpace(SPACE_ID);

        var ENVIRONMENT_ID = "";

        //Locating Current Environment
        let environment;
        console.log("Running with the following configuration");
        console.log(`SPACE_ID: ${SPACE_ID}`);
        if (
            ENVIRONMENT_INPUT == 'master' ||
            ENVIRONMENT_INPUT == 'staging' ||
            ENVIRONMENT_INPUT == 'qa'
        ) {
            console.log(`Running on ${ENVIRONMENT_INPUT}.`);
            console.log(`Updating ${ENVIRONMENT_INPUT} alias.`);
            ENVIRONMENT_ID = `${ENVIRONMENT_INPUT}-`.concat(getStringDate());
        } else {
            console.log('Running on feature branch');
            ENVIRONMENT_ID = ENVIRONMENT_INPUT;
        }
        console.log(`ENVIRONMENT_ID: ${ENVIRONMENT_ID}`);
        function getStringDate() {
            var d = new Date();
            function pad(n) {
                return n < 10 ? '0' + n : n;
            }
            return (
                d.toISOString().substring(0, 10) +
                '-' +
                pad(d.getUTCHours()) +
                pad(d.getUTCMinutes())
            );
        }
        // ---------------------------------------------------------------------------
        console.log(`Checking for existing versions of environment: ${ENVIRONMENT_ID}`);

        //Set default to other environment

        client.getLocales()
            .then((reponse) => console.log(response))
            .catch(console.error)

        console.log('Set default locale to new environment');
        const defaultLocale = (await environment.getLocales()).items.find(
            (locale) => "CI_master"
        ).code;
        console.log("Current Environment"+defaultLocale);

        try {
            console.log("Transferring Entries");
            migration.transformEntries({
                contentType: CONTENTFUL_PAYLOAD.contentType.sys.id,
                from:CONTENTFUL_PAYLOAD.environment.sys.id,
                to: CONTENTFUL_PAYLOAD.contentType.sys.id,
                transformEntryForLocale: function (fromFields, defaultLocale) {
                    const newByline = CONTENTFUL_PAYLOAD.fields
                    return { byline: newByline }
                }
            })

        }
        catch (error) {
            console.log(error);
        }
    }
    catch (err) {
        console.log(err);
    }
}
)


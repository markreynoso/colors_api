# Colors API
Simple node backend for colors app.

## endpoints
`/seeddb`
Will drop table, create new table, and seed table with 100 random hex values for colors. 

`/api/colors`
Returns all colors currently in color_list table:
```
{
    color_id: 1,
    hex: '#000000',
}
```

### Getting Started
---
##### *Prerequisites*
* [node.js](https://nodejs.org/en/download/)
* [git](https://git-scm.com/)

##### *Installation*
First, clone the project repo from Github. Then, change directories into the cloned repository. To accomplish this, execute these commands:

`$ git clone https://github.com/markreynoso/colors_api.git`

`$ cd colors_api`

Now now that you have cloned your repo and changed directories into the project, install the package dependencies.

`$ npm install`

You are now ready to run the program on your local machine.

`$ npm start`

Open your browser and navigate to the following url and proceed to the endpoint you desire.

[http://localhost:3000](http://localhost:3000)

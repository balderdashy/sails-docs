# Prerequisite: 

You need the following tools to proceed with this tutorial. 

* SSH Client, Open SSH is preferable in windows you can use that by installing Cygwin.

* RSync, If you dont have it built in you can install it with Cygwin as well. 

For windows user please make sure you added the Cygwin bin directory to your environment variable path. 

# Create and setup virtual machine 
This section will talks about how to create and set up virtual machine inside Azure if you want to deploy to an existing virtual machine Please move to next section. 

## Creating virtual machine 
When creating virtual machine please make sure you create Ubuntu 12.04 LTS inside Azure. Azure has a image of that inside their gallery. When creating the machine you will notice that SSH endpoint will already be created for you, please create three additional endpoint; HTTP with port 80, HTTPS with port 443 and SAILS with port 1337, also it is a good idea to keep both incoming and outgoing port same. At this moment please do not use any loadbalancer. 

Now you are ready to setup you machine for deploying your code to virtual machine. Please relax, have a break while Azure prepare the server for you. 

## Setup you machine 
 Now we will setup our newly created virtual machine for code deployment. Please run the following command in order to setup your machine. 

### The following command will install all the required packages 


```
#!bash

sudo apt-get update
sudo apt-get install -y python-software-properties
sudo add-apt-repository -y ppa:chris-lea/node.js
sudo apt-get update
sudo apt-get install -y nodejs
```

### Lastly we need to create a directory to deploy our code.

We make our directory readable, writable and executable by everyone to avoid issues during transfer. However if needed you can change the permission based on your need after deploying your code.
```
#!bash


mkdir SailsApp
chmod -R 0777 SailsApp/ -c
```
And our machine has been setup for code deployment. 

## Code deployment

We are going to use rsync to deploy code to vm. If you are on windows you can install rsync with Cygwin. Although there are different variation of rsync available, in this tutorial I will cover rsync using a command prompt. If you want you can use GUI or other variation of rsync at your own risk. 

Open a command prompt as a super user and go to the parent directory of your app. If your app direcory is home/SailsApp then you should be inside home directory. From there run the following command in your command prompt


```
#!bash

chmod -R 777 SailsApp -c
rsync -avp --exclude 'node_modules' ./SailsApp/ [username]@[machinename].cloudapp.net:SailsApp  
```
If you send large files you want to compress them by adding z flags. Here is a [list](http://www.evbackup.com/support-commonly-used-rsync-arguments/) of common flags that you can use with rsync. 

If you are successfully transfer your files then you can move to next part of this tutorial and where we will start our server

## Starting our server 

### Testing with sails 
Login to the server using SSH, go inside the app directory and run the following command.


```
#!bash

npm install sails -g
npm install

```

This will sails globally along with all other required node modules. Once installed please lift the sails server using these command. 

```
#!bash

sails lift
```
If your server is running in a port lower that 1000 then use this command instead

```
#!bash

sudo sails lift
```
Now visit your app url along with your proxy. The best way to do it using curl. For example if our app url is http://[machinename].cloudapp.net and port is 1337 the curl command should be 

```
#!bash

curl http://[machinename].cloudapp.net:1337
```
If you can knock the server properly then move ahead otherwise there is issue with your installation. Before moving to next stage please install npm module forever as a super user. We are going to use this to run our server as a background process. In here I am going to install it globally. You can install it locally as well. The command for installation is 


```
#!bash

sudo npm install -g forever
```


### Running the server

Before continue makes sure you server is already running smoothly with sails lift in prod environment and using a port below 1000, 
**The following command should be run in a super user mode otherwise you will not be allowed to lift your sails in a port below 1000.

Run the following command to start your server. 

```
#!bash

sudo forever start app.js --prod  
```

For stopping it 

```
#!bash

sudo forever stop app.js --prod  
```

For listing

```
#!bash

sudo forever list
```


Please check [forever github repo](https://github.com/nodejitsu/forever/blob/master/README.md) for additional command.


And now you are up and running. 




*Note: According to sails [deployment guide](http://sailsjs.org/#!documentation/deployment) Using forever is a quick start. The proper way to deploy is with upstart and nginx and takes a lot more work to set up.


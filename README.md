## React PWA PoC/Prototype for Forbruksundersøkele 2021

### Development

```bash
$ npm install -g react-scripts
$ npm i
$ npm start
```

Point browser to http://localhost:3000/

----

## Testing PWA on mobile

*OBS*: Uses nginx to serve the application - will be configured properly on a later date

### Prerequisites
- [Docker](https://docs.docker.com/get-docker/)

### Running a production ready version
1. Build image
   ```bash
   $ docker build -t fbu:v0.1 .
   ``` 
1. Start application
   ```
   $ docker run -dp 443:443 fbu:v0.1
   ```
   
### Accessing the application 
1. Only PWAs that can be accessed over HTTPS can be installed as an "app"
1. The image has the correct certificates for `*.ssb.no` and can be correctly served with a *.ssb.no name. 
1. Make an entry for `fbu.ssb.no` in your `/etc/hosts` and point it to your ip address :
   ```bash
   $ sudo cat >> /etc/hosts
   XX.XX.XX.XX  fbu.ssb.no
   ```
   *OBS* : For Windows, it might be found at `C:\Windows\System32\drivers\etc\hosts`
1. Point your browser to https://fbu.ssb.no and you should see the front page of the app.

### Accessing from a mobile device
1. You will have to install an app like [VpnHosts](https://play.google.com/store/apps/details?id=com.github.xfalcon.vhosts&hl=en) (android) on your mobile to map fbu.ssb.no to your IP address.
1. The format of the Hosts file is the same as /etc/hosts file  

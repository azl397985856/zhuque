## Introduction
Dashboard to show error and performance log integrated with security and persistence. There will be four **MIT** to do,
collect, store，process and alarm. so what I do is store and process, the alarm is under consideration. and if you want
to collect data from the clients, try using the [zhuque-client](https://github.com/azl397985856/zhuque-client).

## Usage

```bash
npm install
npm run build
npm run start
```
And open http://127.0.0.1:1024/webpack-dev-server/index.html
before getting started, you should visit /login with {name: 'lzp', password: 'lzp'}, try /logout to logout. cause I'm prepared for logging with 3rd party login server. if you'r intersted with it, follow my account for the latest news

![image](https://github.com/azl397985856/zhuque/raw/master/clip.png)

Dashboard
![image](https://github.com/azl397985856/zhuque/raw/master/dashboard.png)
![image](https://github.com/azl397985856/zhuque/raw/master/dashboard2.png)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
the data stored in localhost/mydb/logs

## In Progress
1. graph added(d3) !minor
2. fuzzy search(projectName and userAgent) !minor

## Contribution

We welcome all contributions, please submit any ideas as [pull requests](https://github.com/azl397985856/zhuque/pulls) or as a [GitHub issue](https://github.com/azl397985856/zhuque/issues).
## Licence
MIT

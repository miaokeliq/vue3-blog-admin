import axios from "axios";
import { ElLoading } from "element-plus";
import message from "@/utils/Message";
import router from "@/router";
//表单类型
const contentTypeForm = "application/x-www-form-urlencoded;charset=UTF-8";
//json类型
const contentTypeJson = "application/json";
//上传文件，文件类型
const contentTypeFile = "multipart/form-data";

const request = (config) => {
  let { url, params, dataType = "form", showLoading = "true" } = config;
  // header头信息
  let contentType = contentTypeForm;

  if (dataType === "json") {
    contentType = contentTypeJson;
  } else if (dataType === "file") {
    contentType = contentTypeFile;

    // 查阅 axios 上传文件相关资料
    // 上传文件可能还带有额外参数，要把这些额外的参数加进去，最后再把这个文件也加进去
    let param = new FormData();
    for (let key in params) {
      param.append(key, param);
    }
    params = param;
  }
  // 真正的axios操作
  const instance = axios.create({
    baseURL: "/api",
    timeout: 10 * 1000,
    headers: {
      "Content-Type": contentType,
      "X-Requested-With": "XMLHttpRequest",
    },
  });

  let loading = null;
  // 添加*请求* 拦截器  ，所以后面是 .request
  instance.interceptors.request.use(
    // config是在发送请求之前做些什么
    (config) => {
      // 判断发送请求之前是否要添加 加载组件
      if (showLoading) {
        // 调用elementplus的 加载组件
        loading = ElLoading.service({
          lock: true,
          text: "加载中......",
          background: "rgba(0, 0, 0, 0.7)",
        });
      }
      return config;
    },
    // error是对请求错误做些什么
    (error) => {
      if (showLoading && loading) {
        loading.close();
      }
      message.error("发送请求失败");
      return Promise.reject("发送请求失败");
    }
  );

  //请求后拦截
  instance.interceptors.response.use(
    (response) => {
      if (showLoading && loading) {
        loading.close();
      }

      const responseData = response.data; //response.data才是接口返回的数据
      if (responseData.status == "error") {
        if (config.errorCallback) {
          config.errorCallback();
        }

        return Promise.reject(responseData.info);
      } else {
        if (responseData.code == 200) {
          return responseData;
        } else if (responseData.code == 901) {
          setTimeout(() => {
            router.push("/login");
          }, 2000);
          return Promise.reject("登陆超时");
        }
      }
    },
    // 不会通过http状态码判断，就算登陆密码错了，http状态码也是200，业务错误是通过 “status”来判断
    // 只有在网络有问题，或者服务挂了，才会到下面的error
    (error) => {
      if (showLoading && loading) {
        loading.close();
      }
      console.log(error);
      return Promise.reject("网络异常");
    }
  );

  // 写法 一
  return instance.post(url, params).catch((error) => {
    message.error(error);
    return null;
  });

  // 写法 二
  // let result = new Promise((resolve, reject) => {
  //   instance
  //     .post(url, params)
  //     .then((res) => {
  //       resolve(res);
  //     })
  //     .catch((error) => {
  //       message.error(error);
  //     });
  // });

  return result;
};

export default request;

"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/user/route";
exports.ids = ["app/api/user/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fuser%2Froute&page=%2Fapi%2Fuser%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuser%2Froute.ts&appDir=%2FUsers%2Fsydneysanders%2FDesktop%2FCodeProjects%2FSOLOMON_V3%2Fsolomon_ai%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fsydneysanders%2FDesktop%2FCodeProjects%2FSOLOMON_V3%2Fsolomon_ai&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fuser%2Froute&page=%2Fapi%2Fuser%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuser%2Froute.ts&appDir=%2FUsers%2Fsydneysanders%2FDesktop%2FCodeProjects%2FSOLOMON_V3%2Fsolomon_ai%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fsydneysanders%2FDesktop%2FCodeProjects%2FSOLOMON_V3%2Fsolomon_ai&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_sydneysanders_Desktop_CodeProjects_SOLOMON_V3_solomon_ai_src_app_api_user_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/user/route.ts */ \"(rsc)/./src/app/api/user/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/user/route\",\n        pathname: \"/api/user\",\n        filename: \"route\",\n        bundlePath: \"app/api/user/route\"\n    },\n    resolvedPagePath: \"/Users/sydneysanders/Desktop/CodeProjects/SOLOMON_V3/solomon_ai/src/app/api/user/route.ts\",\n    nextConfigOutput,\n    userland: _Users_sydneysanders_Desktop_CodeProjects_SOLOMON_V3_solomon_ai_src_app_api_user_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/user/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZ1c2VyJTJGcm91dGUmcGFnZT0lMkZhcGklMkZ1c2VyJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGdXNlciUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRnN5ZG5leXNhbmRlcnMlMkZEZXNrdG9wJTJGQ29kZVByb2plY3RzJTJGU09MT01PTl9WMyUyRnNvbG9tb25fYWklMkZzcmMlMkZhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPSUyRlVzZXJzJTJGc3lkbmV5c2FuZGVycyUyRkRlc2t0b3AlMkZDb2RlUHJvamVjdHMlMkZTT0xPTU9OX1YzJTJGc29sb21vbl9haSZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQXNHO0FBQ3ZDO0FBQ2M7QUFDeUM7QUFDdEg7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxpRUFBaUU7QUFDekU7QUFDQTtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUN1SDs7QUFFdkgiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zb2xvbW9uX2FpLz9kYjJiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIi9Vc2Vycy9zeWRuZXlzYW5kZXJzL0Rlc2t0b3AvQ29kZVByb2plY3RzL1NPTE9NT05fVjMvc29sb21vbl9haS9zcmMvYXBwL2FwaS91c2VyL3JvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS91c2VyL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvdXNlclwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvdXNlci9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIi9Vc2Vycy9zeWRuZXlzYW5kZXJzL0Rlc2t0b3AvQ29kZVByb2plY3RzL1NPTE9NT05fVjMvc29sb21vbl9haS9zcmMvYXBwL2FwaS91c2VyL3JvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuY29uc3Qgb3JpZ2luYWxQYXRobmFtZSA9IFwiL2FwaS91c2VyL3JvdXRlXCI7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHNlcnZlckhvb2tzLFxuICAgICAgICBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIG9yaWdpbmFsUGF0aG5hbWUsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fuser%2Froute&page=%2Fapi%2Fuser%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuser%2Froute.ts&appDir=%2FUsers%2Fsydneysanders%2FDesktop%2FCodeProjects%2FSOLOMON_V3%2Fsolomon_ai%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fsydneysanders%2FDesktop%2FCodeProjects%2FSOLOMON_V3%2Fsolomon_ai&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./src/app/api/lib/db.tsx":
/*!********************************!*\
  !*** ./src/app/api/lib/db.tsx ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   db: () => (/* binding */ db)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst prismaClientSingleton = ()=>{\n    return new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\n};\nconst prisma = globalThis.prismaGlobal ?? prismaClientSingleton();\nconst db = prisma;\nif (true) globalThis.prismaGlobal = prisma;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9saWIvZGIudHN4IiwibWFwcGluZ3MiOiI7Ozs7OztBQUE2QztBQUU3QyxNQUFNQyx3QkFBd0I7SUFDNUIsT0FBTyxJQUFJRCx3REFBWUE7QUFDekI7QUFNQSxNQUFNRSxTQUFTQyxXQUFXQyxZQUFZLElBQUlIO0FBRW5DLE1BQU1JLEtBQUtILE9BQU07QUFFeEIsSUFBSUksSUFBeUIsRUFBY0gsV0FBV0MsWUFBWSxHQUFHRiIsInNvdXJjZXMiOlsid2VicGFjazovL3NvbG9tb25fYWkvLi9zcmMvYXBwL2FwaS9saWIvZGIudHN4P2IyM2EiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJpc21hQ2xpZW50IH0gZnJvbSAnQHByaXNtYS9jbGllbnQnXG5cbmNvbnN0IHByaXNtYUNsaWVudFNpbmdsZXRvbiA9ICgpID0+IHtcbiAgcmV0dXJuIG5ldyBQcmlzbWFDbGllbnQoKVxufVxuXG5kZWNsYXJlIGdsb2JhbCB7XG4gIHZhciBwcmlzbWFHbG9iYWw6IHVuZGVmaW5lZCB8IFJldHVyblR5cGU8dHlwZW9mIHByaXNtYUNsaWVudFNpbmdsZXRvbj5cbn1cblxuY29uc3QgcHJpc21hID0gZ2xvYmFsVGhpcy5wcmlzbWFHbG9iYWwgPz8gcHJpc21hQ2xpZW50U2luZ2xldG9uKClcblxuZXhwb3J0IGNvbnN0IGRiID0gcHJpc21hXG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSBnbG9iYWxUaGlzLnByaXNtYUdsb2JhbCA9IHByaXNtYVxuXG5cbiJdLCJuYW1lcyI6WyJQcmlzbWFDbGllbnQiLCJwcmlzbWFDbGllbnRTaW5nbGV0b24iLCJwcmlzbWEiLCJnbG9iYWxUaGlzIiwicHJpc21hR2xvYmFsIiwiZGIiLCJwcm9jZXNzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/lib/db.tsx\n");

/***/ }),

/***/ "(rsc)/./src/app/api/user/route.ts":
/*!***********************************!*\
  !*** ./src/app/api/user/route.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/db */ \"(rsc)/./src/app/api/lib/db.tsx\");\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bcrypt */ \"bcrypt\");\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bcrypt__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! zod */ \"(rsc)/./node_modules/zod/lib/index.mjs\");\n\n\n\n\n//Define the schema for input validation \nconst userSchema = zod__WEBPACK_IMPORTED_MODULE_3__.object({\n    username: zod__WEBPACK_IMPORTED_MODULE_3__.string().min(1, \"Username is required\").max(100),\n    email: zod__WEBPACK_IMPORTED_MODULE_3__.string().min(1, \"Email is required\").email(\"Invalid email\"),\n    password: zod__WEBPACK_IMPORTED_MODULE_3__.string().min(1, \"Password is required\").min(1, \"Password must have than 8 characters\")\n});\nasync function POST(req) {\n    try {\n        const body = await req.json();\n        const { email, username, password } = userSchema.parse(body);\n        console.log(\"Parsed JSON body:\", body);\n        //check if email already exist \n        const existingUserByEmail = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.user.findUnique({\n            where: {\n                email: email\n            }\n        });\n        if (existingUserByEmail) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                user: null,\n                message: \"User with this email already exisit\"\n            }, {\n                status: 409\n            });\n        }\n        //Check if user name\n        const existingUserByUserName = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.user.findUnique({\n            where: {\n                username: username\n            }\n        });\n        if (existingUserByUserName) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                user: null,\n                message: \"User with this username already exisit\"\n            }, {\n                status: 409\n            });\n        }\n        const hashedPassword = await (0,bcrypt__WEBPACK_IMPORTED_MODULE_2__.hash)(password, 10);\n        const newUser = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.user.create({\n            data: {\n                username,\n                email,\n                password: hashedPassword\n            }\n        });\n        const { password: newUserPassword, ...rest } = newUser;\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            user: newUser,\n            message: \"User created successfully\"\n        }, {\n            status: 201\n        });\n    } catch (e) {\n        console.error(e);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            message: `Something went wrong ${e}`\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS91c2VyL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUEyQztBQUNaO0FBQ0o7QUFDSDtBQUd4Qix5Q0FBeUM7QUFDekMsTUFBTUksYUFBYUQsdUNBQ1YsQ0FBQztJQUNORyxVQUFVSCx1Q0FBUSxHQUFHSyxHQUFHLENBQUMsR0FBRyx3QkFBd0JDLEdBQUcsQ0FBQztJQUN4REMsT0FBT1AsdUNBQVEsR0FBR0ssR0FBRyxDQUFDLEdBQUcscUJBQXFCRSxLQUFLLENBQUM7SUFDcERDLFVBQVVSLHVDQUNELEdBQ05LLEdBQUcsQ0FBQyxHQUFHLHdCQUNQQSxHQUFHLENBQUMsR0FBRztBQUNaO0FBSU0sZUFBZUksS0FBS0MsR0FBWTtJQUdwQyxJQUFHO1FBRUQsTUFBTUMsT0FBTyxNQUFNRCxJQUFJRSxJQUFJO1FBQzNCLE1BQU0sRUFBQ0wsS0FBSyxFQUFFSixRQUFRLEVBQUVLLFFBQVEsRUFBRSxHQUFJUCxXQUFXWSxLQUFLLENBQUNGO1FBQ3ZERyxRQUFRQyxHQUFHLENBQUMscUJBQXFCSjtRQUdqQywrQkFBK0I7UUFDL0IsTUFBTUssc0JBQXNCLE1BQU1sQix1Q0FBRUEsQ0FBQ21CLElBQUksQ0FBQ0MsVUFBVSxDQUFDO1lBQ2xEQyxPQUFPO2dCQUFDWixPQUFPQTtZQUFLO1FBQ3ZCO1FBQ0EsSUFBR1MscUJBQXFCO1lBQ3JCLE9BQU9uQixxREFBWUEsQ0FBQ2UsSUFBSSxDQUFDO2dCQUFDSyxNQUFNO2dCQUFNRyxTQUFTO1lBQXFDLEdBQUc7Z0JBQUNDLFFBQVE7WUFBRztRQUN0RztRQUVBLG9CQUFvQjtRQUVwQixNQUFNQyx5QkFBeUIsTUFBTXhCLHVDQUFFQSxDQUFDbUIsSUFBSSxDQUFDQyxVQUFVLENBQUM7WUFDckRDLE9BQU87Z0JBQUNoQixVQUFVQTtZQUFRO1FBQzdCO1FBQ0EsSUFBR21CLHdCQUF3QjtZQUN4QixPQUFPekIscURBQVlBLENBQUNlLElBQUksQ0FBQztnQkFBQ0ssTUFBTTtnQkFBTUcsU0FBUztZQUF3QyxHQUFHO2dCQUFDQyxRQUFRO1lBQUc7UUFDekc7UUFFQSxNQUFNRSxpQkFBaUIsTUFBTXhCLDRDQUFJQSxDQUFDUyxVQUFVO1FBQzVDLE1BQU1nQixVQUFVLE1BQU0xQix1Q0FBRUEsQ0FBQ21CLElBQUksQ0FBQ1EsTUFBTSxDQUNoQztZQUNFQyxNQUFNO2dCQUNIdkI7Z0JBQ0FJO2dCQUNBQyxVQUFVZTtZQUViO1FBQ0Y7UUFHSixNQUFNLEVBQUNmLFVBQVVtQixlQUFlLEVBQUUsR0FBR0MsTUFBSyxHQUFHSjtRQUk3QyxPQUFPM0IscURBQVlBLENBQUNlLElBQUksQ0FBQztZQUFDSyxNQUFNTztZQUFTSixTQUFTO1FBQTJCLEdBQUc7WUFBQ0MsUUFBUTtRQUFHO0lBRTlGLEVBQUMsT0FBTVEsR0FBRztRQUNSZixRQUFRZ0IsS0FBSyxDQUFDRDtRQUNkLE9BQU9oQyxxREFBWUEsQ0FBQ2UsSUFBSSxDQUFDO1lBQUNRLFNBQVMsQ0FBQyxxQkFBcUIsRUFBRVMsRUFBRSxDQUFDO1FBQUEsR0FBSztZQUFDUixRQUFRO1FBQUc7SUFDakY7QUFDSCIsInNvdXJjZXMiOlsid2VicGFjazovL3NvbG9tb25fYWkvLi9zcmMvYXBwL2FwaS91c2VyL3JvdXRlLnRzPzgyZTYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCI7XG5pbXBvcnQgeyBkYiB9IGZyb20gXCIuLi9saWIvZGJcIjtcbmltcG9ydCB7aGFzaH0gZnJvbSAnYmNyeXB0J1xuaW1wb3J0ICogYXMgeiBmcm9tICd6b2QnXG5cblxuLy9EZWZpbmUgdGhlIHNjaGVtYSBmb3IgaW5wdXQgdmFsaWRhdGlvbiBcbmNvbnN0IHVzZXJTY2hlbWEgPSB6XG4gIC5vYmplY3Qoe1xuICAgIHVzZXJuYW1lOiB6LnN0cmluZygpLm1pbigxLCAnVXNlcm5hbWUgaXMgcmVxdWlyZWQnKS5tYXgoMTAwKSxcbiAgICBlbWFpbDogei5zdHJpbmcoKS5taW4oMSwgJ0VtYWlsIGlzIHJlcXVpcmVkJykuZW1haWwoJ0ludmFsaWQgZW1haWwnKSxcbiAgICBwYXNzd29yZDogelxuICAgICAgLnN0cmluZygpXG4gICAgICAubWluKDEsICdQYXNzd29yZCBpcyByZXF1aXJlZCcpXG4gICAgICAubWluKDEsICdQYXNzd29yZCBtdXN0IGhhdmUgdGhhbiA4IGNoYXJhY3RlcnMnKSxcbiAgfSlcbiBcblxuXG5leHBvcnQgIGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxOiBSZXF1ZXN0KSBcblxuIHsgXG4gICAgdHJ5e1xuXG4gICAgICBjb25zdCBib2R5ID0gYXdhaXQgcmVxLmpzb24oKVxuICAgICAgY29uc3Qge2VtYWlsLCB1c2VybmFtZSwgcGFzc3dvcmQgfSA9ICB1c2VyU2NoZW1hLnBhcnNlKGJvZHkpXG4gICAgICBjb25zb2xlLmxvZyhcIlBhcnNlZCBKU09OIGJvZHk6XCIsIGJvZHkpO1xuXG5cbiAgICAgIC8vY2hlY2sgaWYgZW1haWwgYWxyZWFkeSBleGlzdCBcbiAgICAgIGNvbnN0IGV4aXN0aW5nVXNlckJ5RW1haWwgPSBhd2FpdCBkYi51c2VyLmZpbmRVbmlxdWUoe1xuICAgICAgICAgd2hlcmU6IHtlbWFpbDogZW1haWx9XG4gICAgICB9KVxuICAgICAgaWYoZXhpc3RpbmdVc2VyQnlFbWFpbCkgeyBcbiAgICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7dXNlcjogbnVsbCwgbWVzc2FnZTogXCJVc2VyIHdpdGggdGhpcyBlbWFpbCBhbHJlYWR5IGV4aXNpdFwifSwge3N0YXR1czogNDA5fSlcbiAgICAgIH1cblxuICAgICAgLy9DaGVjayBpZiB1c2VyIG5hbWVcbiAgICAgIFxuICAgICAgY29uc3QgZXhpc3RpbmdVc2VyQnlVc2VyTmFtZSA9IGF3YWl0IGRiLnVzZXIuZmluZFVuaXF1ZSh7XG4gICAgICAgICB3aGVyZToge3VzZXJuYW1lOiB1c2VybmFtZX1cbiAgICAgIH0pXG4gICAgICBpZihleGlzdGluZ1VzZXJCeVVzZXJOYW1lKSB7IFxuICAgICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHt1c2VyOiBudWxsLCBtZXNzYWdlOiBcIlVzZXIgd2l0aCB0aGlzIHVzZXJuYW1lIGFscmVhZHkgZXhpc2l0XCJ9LCB7c3RhdHVzOiA0MDl9KVxuICAgICAgfVxuXG4gICAgICBjb25zdCBoYXNoZWRQYXNzd29yZCA9IGF3YWl0IGhhc2gocGFzc3dvcmQsIDEwKVxuICAgICAgY29uc3QgbmV3VXNlciA9IGF3YWl0IGRiLnVzZXIuY3JlYXRlKFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGRhdGE6IHsgXG4gICAgICAgICAgICAgICB1c2VybmFtZSxcbiAgICAgICAgICAgICAgIGVtYWlsLFxuICAgICAgICAgICAgICAgcGFzc3dvcmQ6IGhhc2hlZFBhc3N3b3JkXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICApO1xuXG4gICAgICBjb25zdCB7cGFzc3dvcmQ6IG5ld1VzZXJQYXNzd29yZCwgLi4ucmVzdH0gPSBuZXdVc2VyO1xuXG4gICAgICBcbiAgICAgIFxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHt1c2VyOiBuZXdVc2VyLCBtZXNzYWdlOiBcIlVzZXIgY3JlYXRlZCBzdWNjZXNzZnVsbHlcIn0sIHtzdGF0dXM6IDIwMX0pXG5cbiAgICB9Y2F0Y2goZSkgeyBcbiAgICAgIGNvbnNvbGUuZXJyb3IoZSlcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7bWVzc2FnZTogYFNvbWV0aGluZyB3ZW50IHdyb25nICR7ZX1gfSAsICB7c3RhdHVzOiA1MDB9KVxuICAgIH1cbiB9Il0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsImRiIiwiaGFzaCIsInoiLCJ1c2VyU2NoZW1hIiwib2JqZWN0IiwidXNlcm5hbWUiLCJzdHJpbmciLCJtaW4iLCJtYXgiLCJlbWFpbCIsInBhc3N3b3JkIiwiUE9TVCIsInJlcSIsImJvZHkiLCJqc29uIiwicGFyc2UiLCJjb25zb2xlIiwibG9nIiwiZXhpc3RpbmdVc2VyQnlFbWFpbCIsInVzZXIiLCJmaW5kVW5pcXVlIiwid2hlcmUiLCJtZXNzYWdlIiwic3RhdHVzIiwiZXhpc3RpbmdVc2VyQnlVc2VyTmFtZSIsImhhc2hlZFBhc3N3b3JkIiwibmV3VXNlciIsImNyZWF0ZSIsImRhdGEiLCJuZXdVc2VyUGFzc3dvcmQiLCJyZXN0IiwiZSIsImVycm9yIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/user/route.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/zod"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fuser%2Froute&page=%2Fapi%2Fuser%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuser%2Froute.ts&appDir=%2FUsers%2Fsydneysanders%2FDesktop%2FCodeProjects%2FSOLOMON_V3%2Fsolomon_ai%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fsydneysanders%2FDesktop%2FCodeProjects%2FSOLOMON_V3%2Fsolomon_ai&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();
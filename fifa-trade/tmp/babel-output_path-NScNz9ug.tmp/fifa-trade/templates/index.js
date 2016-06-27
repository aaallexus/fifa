define("fifa-trade/templates/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.0",
          "loc": {
            "source": null,
            "start": {
              "line": 6,
              "column": 4
            },
            "end": {
              "line": 8,
              "column": 4
            }
          },
          "moduleName": "fifa-trade/templates/index.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("					");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          var el2 = dom.createElement("a");
          dom.setAttribute(el2, "href", "#");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element9 = dom.childAt(fragment, [1, 0]);
          var morphs = new Array(2);
          morphs[0] = dom.createElementMorph(element9);
          morphs[1] = dom.createMorphAt(element9, 0, 0);
          return morphs;
        },
        statements: [["element", "action", ["goTo", ["get", "menuItem.url", ["loc", [null, [7, 37], [7, 49]]]]], [], ["loc", [null, [7, 21], [7, 51]]]], ["content", "menuItem.title", ["loc", [null, [7, 52], [7, 70]]]]],
        locals: ["menuItem"],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.0",
          "loc": {
            "source": null,
            "start": {
              "line": 16,
              "column": 8
            },
            "end": {
              "line": 29,
              "column": 8
            }
          },
          "moduleName": "fifa-trade/templates/index.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("			    		");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("a");
          dom.setAttribute(el1, "class", "dropdown-toggle account");
          dom.setAttribute(el1, "data-toggle", "dropdown");
          dom.setAttribute(el1, "id", "showRightMenu");
          dom.setAttribute(el1, "href", "#");
          var el2 = dom.createTextNode("\n				            ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("img");
          dom.setAttribute(el2, "class", "userpic");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n				        ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n				        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "dropdown-menu pull-right login-form");
          var el2 = dom.createTextNode("\n				        	");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("ul");
          dom.setAttribute(el2, "class", "user-menu");
          var el3 = dom.createTextNode("\n				        		");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("li");
          var el4 = dom.createElement("a");
          dom.setAttribute(el4, "href", "#");
          var el5 = dom.createTextNode("Личный кабинет");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n				        		");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("li");
          var el4 = dom.createTextNode("Сообщения");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n				        		");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("li");
          var el4 = dom.createTextNode("Мои игроки");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n				        		");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("li");
          dom.setAttribute(el3, "class", "divider");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n				        		");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("li");
          var el4 = dom.createElement("a");
          dom.setAttribute(el4, "href", "#");
          var el5 = dom.createTextNode("Выход");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n				        	");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n				        ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element4 = dom.childAt(fragment, [1]);
          var element5 = dom.childAt(element4, [1]);
          var element6 = dom.childAt(fragment, [3, 1]);
          var element7 = dom.childAt(element6, [1, 0]);
          var element8 = dom.childAt(element6, [9, 0]);
          var morphs = new Array(4);
          morphs[0] = dom.createAttrMorph(element5, 'src');
          morphs[1] = dom.createMorphAt(element4, 2, 2);
          morphs[2] = dom.createElementMorph(element7);
          morphs[3] = dom.createElementMorph(element8);
          return morphs;
        },
        statements: [["attribute", "src", ["concat", [["get", "curUser.photo_small", ["loc", [null, [18, 44], [18, 63]]]]]]], ["content", "curUser.name", ["loc", [null, [18, 67], [18, 83]]]], ["element", "action", ["goToCabinet", ["get", "curUser.id", ["loc", [null, [22, 53], [22, 63]]]]], [], ["loc", [null, [22, 30], [22, 65]]]], ["element", "action", ["logout"], [], ["loc", [null, [26, 30], [26, 49]]]]],
        locals: [],
        templates: []
      };
    })();
    var child2 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.0",
          "loc": {
            "source": null,
            "start": {
              "line": 29,
              "column": 8
            },
            "end": {
              "line": 108,
              "column": 8
            }
          },
          "moduleName": "fifa-trade/templates/index.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("				        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("a");
          dom.setAttribute(el1, "class", "dropdown-toggle account");
          dom.setAttribute(el1, "href", "#");
          var el2 = dom.createTextNode("\n				            Войти в систему\n				        ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n				        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "dropdown-menu pull-right login-form");
          dom.setAttribute(el1, "id", "rightMenu");
          var el2 = dom.createTextNode("\n				            ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("ul");
          dom.setAttribute(el2, "class", "nav nav-tabs");
          var el3 = dom.createTextNode("\n				                ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("li");
          dom.setAttribute(el3, "class", "active");
          var el4 = dom.createElement("a");
          dom.setAttribute(el4, "href", "#auth-tab");
          dom.setAttribute(el4, "data-toggle", "tab");
          dom.setAttribute(el4, "aria-expanded", "true");
          var el5 = dom.createTextNode("Авторизация");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n				                ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("li");
          dom.setAttribute(el3, "class", "");
          var el4 = dom.createElement("a");
          dom.setAttribute(el4, "href", "#reg-tab");
          dom.setAttribute(el4, "data-toggle", "tab");
          dom.setAttribute(el4, "aria-expanded", "false");
          var el5 = dom.createTextNode("Регистрация");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n				            ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n				            ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "tab-content");
          var el3 = dom.createTextNode("\n				                ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "tab-pane active");
          dom.setAttribute(el3, "id", "auth-tab");
          var el4 = dom.createTextNode("\n				                    ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("form");
          dom.setAttribute(el4, "method", "POST");
          dom.setAttribute(el4, "action", "auth/");
          var el5 = dom.createTextNode("\n				                        ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("div");
          dom.setAttribute(el5, "class", "row");
          var el6 = dom.createTextNode("\n				                            ");
          dom.appendChild(el5, el6);
          var el6 = dom.createElement("input");
          dom.setAttribute(el6, "class", "form-control");
          dom.setAttribute(el6, "name", "login");
          dom.setAttribute(el6, "placeholder", "Логин");
          dom.appendChild(el5, el6);
          var el6 = dom.createTextNode("\n				                        ");
          dom.appendChild(el5, el6);
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n				                        ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("div");
          dom.setAttribute(el5, "class", "row");
          var el6 = dom.createTextNode("\n				                            ");
          dom.appendChild(el5, el6);
          var el6 = dom.createElement("input");
          dom.setAttribute(el6, "type", "password");
          dom.setAttribute(el6, "name", "password");
          dom.setAttribute(el6, "class", "form-control");
          dom.setAttribute(el6, "placeholder", "Пароль");
          dom.appendChild(el5, el6);
          var el6 = dom.createTextNode("\n				                        ");
          dom.appendChild(el5, el6);
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n				                        ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("div");
          dom.setAttribute(el5, "class", "row");
          var el6 = dom.createTextNode("\n				                            ");
          dom.appendChild(el5, el6);
          var el6 = dom.createElement("div");
          dom.setAttribute(el6, "class", "col-md-8");
          var el7 = dom.createTextNode("\n				                                ");
          dom.appendChild(el6, el7);
          var el7 = dom.createElement("input");
          dom.setAttribute(el7, "type", "checkbox");
          dom.setAttribute(el7, "id", "savePassword");
          dom.appendChild(el6, el7);
          var el7 = dom.createTextNode("\n				                                ");
          dom.appendChild(el6, el7);
          var el7 = dom.createElement("label");
          dom.setAttribute(el7, "for", "savePassword");
          var el8 = dom.createTextNode("Запомнить");
          dom.appendChild(el7, el8);
          dom.appendChild(el6, el7);
          var el7 = dom.createTextNode("\n				                            ");
          dom.appendChild(el6, el7);
          dom.appendChild(el5, el6);
          var el6 = dom.createTextNode("\n				                            ");
          dom.appendChild(el5, el6);
          var el6 = dom.createElement("div");
          dom.setAttribute(el6, "class", "col-md-4");
          var el7 = dom.createTextNode("\n				                                ");
          dom.appendChild(el6, el7);
          var el7 = dom.createElement("button");
          dom.setAttribute(el7, "class", "btn btn-success");
          var el8 = dom.createTextNode("Войти");
          dom.appendChild(el7, el8);
          dom.appendChild(el6, el7);
          var el7 = dom.createTextNode("\n				                            ");
          dom.appendChild(el6, el7);
          dom.appendChild(el5, el6);
          var el6 = dom.createTextNode("\n				                        ");
          dom.appendChild(el5, el6);
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n				                    ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n				                    ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("div");
          dom.setAttribute(el4, "class", "row");
          var el5 = dom.createTextNode("\n				                        ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("div");
          dom.setAttribute(el5, "class", "auth-divider");
          var el6 = dom.createTextNode("\n				                            ");
          dom.appendChild(el5, el6);
          var el6 = dom.createElement("span");
          var el7 = dom.createTextNode("\n				                                или\n				                            ");
          dom.appendChild(el6, el7);
          dom.appendChild(el5, el6);
          var el6 = dom.createTextNode("\n				                        ");
          dom.appendChild(el5, el6);
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n				                    ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n				                    ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("div");
          dom.setAttribute(el4, "class", "row");
          var el5 = dom.createTextNode("\n				                        ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("a");
          dom.setAttribute(el5, "href", "#");
          var el6 = dom.createTextNode("Facebook");
          dom.appendChild(el5, el6);
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n				                        ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("a");
          dom.setAttribute(el5, "href", "#");
          var el6 = dom.createTextNode("VKontakte");
          dom.appendChild(el5, el6);
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n				                    ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n				                ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n				                ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "tab-pane");
          dom.setAttribute(el3, "id", "reg-tab");
          var el4 = dom.createTextNode("\n				                    ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("form");
          dom.setAttribute(el4, "method", "POST");
          dom.setAttribute(el4, "id", "regform");
          dom.setAttribute(el4, "action", "auth/reg.php");
          var el5 = dom.createTextNode("\n				                        ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("div");
          dom.setAttribute(el5, "class", "row");
          var el6 = dom.createTextNode("\n				                            ");
          dom.appendChild(el5, el6);
          var el6 = dom.createElement("input");
          dom.setAttribute(el6, "class", "form-control");
          dom.setAttribute(el6, "type", "text");
          dom.setAttribute(el6, "name", "login");
          dom.setAttribute(el6, "placeholder", "Логин");
          dom.appendChild(el5, el6);
          var el6 = dom.createTextNode("\n				                        ");
          dom.appendChild(el5, el6);
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n				                        ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("div");
          dom.setAttribute(el5, "class", "row");
          var el6 = dom.createTextNode("\n				                            ");
          dom.appendChild(el5, el6);
          var el6 = dom.createElement("input");
          dom.setAttribute(el6, "type", "password");
          dom.setAttribute(el6, "type", "text");
          dom.setAttribute(el6, "class", "form-control");
          dom.setAttribute(el6, "name", "password");
          dom.setAttribute(el6, "placeholder", "Введите пароль");
          dom.appendChild(el5, el6);
          var el6 = dom.createTextNode("\n				                        ");
          dom.appendChild(el5, el6);
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n				                        ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("div");
          dom.setAttribute(el5, "class", "row");
          var el6 = dom.createTextNode("\n				                            ");
          dom.appendChild(el5, el6);
          var el6 = dom.createElement("input");
          dom.setAttribute(el6, "type", "password");
          dom.setAttribute(el6, "type", "text");
          dom.setAttribute(el6, "class", "form-control");
          dom.setAttribute(el6, "name", "repeat_password");
          dom.setAttribute(el6, "placeholder", "Повторите пароль");
          dom.appendChild(el5, el6);
          var el6 = dom.createTextNode("\n				                        ");
          dom.appendChild(el5, el6);
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n				                        ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("div");
          dom.setAttribute(el5, "class", "row");
          var el6 = dom.createTextNode("\n				                            ");
          dom.appendChild(el5, el6);
          var el6 = dom.createElement("input");
          dom.setAttribute(el6, "class", "form-control");
          dom.setAttribute(el6, "type", "text");
          dom.setAttribute(el6, "name", "email");
          dom.setAttribute(el6, "placeholder", "Введите E-mail");
          dom.appendChild(el5, el6);
          var el6 = dom.createTextNode("\n				                        ");
          dom.appendChild(el5, el6);
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n				                        ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("div");
          dom.setAttribute(el5, "class", "row");
          var el6 = dom.createTextNode("\n				                            ");
          dom.appendChild(el5, el6);
          var el6 = dom.createElement("div");
          dom.setAttribute(el6, "class", "col-md-12");
          var el7 = dom.createTextNode("\n				                                ");
          dom.appendChild(el6, el7);
          var el7 = dom.createElement("input");
          dom.setAttribute(el7, "type", "checkbox");
          dom.setAttribute(el7, "id", "reciveMessage");
          dom.appendChild(el6, el7);
          var el7 = dom.createTextNode("\n				                                ");
          dom.appendChild(el6, el7);
          var el7 = dom.createElement("label");
          dom.setAttribute(el7, "for", "reciveMessage");
          var el8 = dom.createTextNode("Я хочу получать уведомления");
          dom.appendChild(el7, el8);
          dom.appendChild(el6, el7);
          var el7 = dom.createTextNode("\n				                            ");
          dom.appendChild(el6, el7);
          dom.appendChild(el5, el6);
          var el6 = dom.createTextNode("\n				                        ");
          dom.appendChild(el5, el6);
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n				                        ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("div");
          dom.setAttribute(el5, "class", "row");
          var el6 = dom.createTextNode("\n				                            ");
          dom.appendChild(el5, el6);
          var el6 = dom.createElement("div");
          dom.setAttribute(el6, "class", "col-md-12");
          var el7 = dom.createTextNode("\n				                                ");
          dom.appendChild(el6, el7);
          var el7 = dom.createElement("input");
          dom.setAttribute(el7, "type", "checkbox");
          dom.setAttribute(el7, "id", "reciveMessage");
          dom.appendChild(el6, el7);
          var el7 = dom.createTextNode("\n				                                ");
          dom.appendChild(el6, el7);
          var el7 = dom.createElement("label");
          dom.setAttribute(el7, "for", "reciveMessage");
          var el8 = dom.createTextNode("Я соглашаюсь с правилами");
          dom.appendChild(el7, el8);
          dom.appendChild(el6, el7);
          var el7 = dom.createTextNode("\n				                            ");
          dom.appendChild(el6, el7);
          dom.appendChild(el5, el6);
          var el6 = dom.createTextNode("\n				                        ");
          dom.appendChild(el5, el6);
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n				                        ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("div");
          dom.setAttribute(el5, "class", "row");
          var el6 = dom.createTextNode("\n				                            ");
          dom.appendChild(el5, el6);
          var el6 = dom.createElement("div");
          dom.setAttribute(el6, "class", "col-md-12");
          var el7 = dom.createTextNode("\n				                                ");
          dom.appendChild(el6, el7);
          var el7 = dom.createElement("input");
          dom.setAttribute(el7, "type", "checkbox");
          dom.setAttribute(el7, "id", "reciveMessage");
          dom.appendChild(el6, el7);
          var el7 = dom.createTextNode("\n				                                ");
          dom.appendChild(el6, el7);
          var el7 = dom.createElement("label");
          dom.setAttribute(el7, "for", "reciveMessage");
          var el8 = dom.createTextNode("Я не робот");
          dom.appendChild(el7, el8);
          dom.appendChild(el6, el7);
          var el7 = dom.createTextNode("\n				                            ");
          dom.appendChild(el6, el7);
          dom.appendChild(el5, el6);
          var el6 = dom.createTextNode("\n				                        ");
          dom.appendChild(el5, el6);
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n				                        ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("div");
          dom.setAttribute(el5, "class", "col-md-4");
          var el6 = dom.createTextNode("\n				                            ");
          dom.appendChild(el5, el6);
          var el6 = dom.createElement("button");
          dom.setAttribute(el6, "class", "btn btn-success");
          var el7 = dom.createTextNode("Зарегистрироваться");
          dom.appendChild(el6, el7);
          dom.appendChild(el5, el6);
          var el6 = dom.createTextNode("\n				                        ");
          dom.appendChild(el5, el6);
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n				                    ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n				                ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n				            ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n				        ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var element1 = dom.childAt(fragment, [3, 3, 1, 5]);
          var element2 = dom.childAt(element1, [1]);
          var element3 = dom.childAt(element1, [3]);
          var morphs = new Array(3);
          morphs[0] = dom.createElementMorph(element0);
          morphs[1] = dom.createElementMorph(element2);
          morphs[2] = dom.createElementMorph(element3);
          return morphs;
        },
        statements: [["element", "action", ["showMenu"], [], ["loc", [null, [30, 56], [30, 77]]]], ["element", "action", ["auth", "facebook"], [], ["loc", [null, [65, 40], [65, 68]]]], ["element", "action", ["auth", "vk"], [], ["loc", [null, [66, 40], [66, 62]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.6.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 119,
            "column": 6
          }
        },
        "moduleName": "fifa-trade/templates/index.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("header");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "top-menu row");
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "col-md-8");
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("nav");
        dom.setAttribute(el4, "class", "left-menu");
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("ul");
        var el6 = dom.createTextNode("\n");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("			");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n		");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n	");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "col-md-4 pull-right text-right");
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("nav");
        dom.setAttribute(el4, "class", "right-menu");
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("ul");
        dom.setAttribute(el5, "class", "form-horizontal");
        var el6 = dom.createTextNode("\n			    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("li");
        dom.setAttribute(el6, "class", "dropdown staus-bar btn-notifi");
        var el7 = dom.createTextNode("\n");
        dom.appendChild(el6, el7);
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("			    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n			");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n		");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n	");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "breadcrumbs");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "container");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element10 = dom.childAt(fragment, [0, 1]);
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(dom.childAt(element10, [1, 1, 1]), 1, 1);
        morphs[1] = dom.createMorphAt(dom.childAt(element10, [3, 1, 1, 1]), 1, 1);
        morphs[2] = dom.createMorphAt(dom.childAt(fragment, [4]), 1, 1);
        return morphs;
      },
      statements: [["block", "each", [["get", "leftMenu", ["loc", [null, [6, 12], [6, 20]]]]], [], 0, null, ["loc", [null, [6, 4], [8, 13]]]], ["block", "if", [["get", "curUser.id", ["loc", [null, [16, 14], [16, 24]]]]], [], 1, 2, ["loc", [null, [16, 8], [108, 15]]]], ["content", "outlet", ["loc", [null, [118, 1], [118, 11]]]]],
      locals: [],
      templates: [child0, child1, child2]
    };
  })());
});
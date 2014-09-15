var alfredo = require('alfredo');

var hub = module.exports = {};

var config = alfredo.readJSONSync('config.json');

var PAGES = {
    issue: {
        path: 'issues',
        text: 'Issues'
    },
    issues: {
        path: 'issues',
        text: 'Issues'
    },
    pull: {
        path: 'pulls',
        text: 'Pull Requests'
    },
    pulls: {
        path: 'pulls',
        text: 'Pull Requests'
    },
    wiki: {
        path: 'wiki',
        text: 'Wiki'
    },
    pulse: {
        path: 'pulse',
        text: 'Pulse'
    },
    graph: {
        path: 'graphs',
        text: 'Graphs'
    },
    graphs: {
        path: 'graphs',
        text: 'Graphs'
    },
    branch: {
        path: 'branches',
        text: 'Branchs'
    },
    branches: {
        path: 'branches',
        text: 'Branchs'
    },
    br: {
        path: 'branches',
        text: 'Branchs'
    },
    releas: {
        path: 'releases',
        text: 'Releases'
    },
    tags: {
        path: 'releases',
        text: 'Releases'
    },
    tag: {
        path: 'releases',
        text: 'Releases'
    },
    releases: {
        path: 'releases',
        text: 'Releases'
    },
    contributor: {
        path: 'contributors',
        text: 'Contributors'
    },
    contributors: {
        path: 'contributors',
        text: 'Contributors'
    },
    ask: {
        path: 'issues/new',
        text: 'Submit a new issue'
    },
    submit: {
        path: 'issues/new',
        text: 'Submit a new issue'
    },
    write: {
        path: 'wiki/_new',
        text: 'Create a wiki page'
    }
};

var BRANCHED_PAGES = {
    code: {
        path: 'tree/${branch}',
        text: 'Code in ${branch}'
    },
    commit: {
        path: 'commits/${branch}',
        text: 'Commits in ${branch}'
    },
    commits: {
        path: 'commits/${branch}',
        text: 'Commits in ${branch}'
    }
};

var PAGE_ORDER = ['code', 'issues', 'pulls', 'ask', 'wiki', 'commits', 'releases', 'branches', 'contributors'];

hub.getItem = function (repository, branch, page) {
    var itemData = null;
    if (BRANCHED_PAGES[page]) {
        itemData = {
            path: BRANCHED_PAGES[page].path.replace('${branch}', branch),
            text: BRANCHED_PAGES[page].text.replace('${branch}', branch)
        };
    }
    else if (PAGES[page]) {
        itemData = PAGES[page];
    }

    var url = 'https://github.com/' + repository + '/' + itemData.path;
    var item = {
        title: itemData.text,
        subtitle: 'Open in github',
        uid: repository + '/' + branch + '/' + page,
        valid: true,
        icon: 'github.png',
        arg: url
    };
    return new alfredo.Item(item);
};

hub.getItems = function (repository, branch, page) {
    if (repository.indexOf('/') < 0) {
        repository = (config.defaultUser ? config.defaultUser + '/' : '') + repository;
    }

    branch = branch || 'master';

    var items = page
        ? hub.getItem(repository, branch, page)
        : PAGE_ORDER.map(hub.getItem.bind(hub, repository, branch));
    return items;
};

hub.isValidPageString = function (page) {
    return !!(BRANCHED_PAGES[page] || PAGES[page]);
};

if (!require.parent) {
    var repository = process.argv[2];
    var branch = process.argv[3];
    var page = process.argv[4];

    // 5种情况：
    //
    // 1. `hub`啥也没输入，则不输出东西
    // 2. `hub {repository}`，输出可选页面
    // 3. `hub {repository} {branch}`，输出可选页面
    // 4. `hub {repository} {page}`，输出唯一页面
    // 5. `hub {repository} {branch} {page}`，输出唯一页面
    //
    // 根据`page`是否在2个字典中存在来确定是`page`还是`branch`

    if (!repository) {
        process.exit();
    }

    // 只有情况4是特殊的要更换变量
    if (!page && hub.isValidPageString(branch)) {
        page = branch;
        branch = null;
    }

    var items = hub.getItems(repository, branch, page);
    alfredo.feedback(items);
}

var alfredo = require('alfredo');

var hub = module.exports = {};

var config = alfredo.readJSONSync('config.json');

var PAGES = {
    issue: {
        path: 'issues',
        text: 'Issues',
        icon: 'icon/issue.png'
    },
    issues: {
        path: 'issues',
        text: 'Issues',
        icon: 'icon/issue.png'
    },
    pull: {
        path: 'pulls',
        text: 'Pull Requests',
        icon: 'icon/pull.png'
    },
    pulls: {
        path: 'pulls',
        text: 'Pull Requests',
        icon: 'icon/pull.png'
    },
    wiki: {
        path: 'wiki',
        text: 'Wiki',
        icon: 'icon/wiki.png'
    },
    pulse: {
        path: 'pulse',
        text: 'Pulse',
        icon: 'icon/pulse.png'
    },
    graph: {
        path: 'graphs',
        text: 'Graphs',
        icon: 'icon/graph.png'
    },
    graphs: {
        path: 'graphs',
        text: 'Graphs',
        icon: 'icon/graph.png'
    },
    branch: {
        path: 'branches',
        text: 'Branchs',
        icon: 'icon/branch.png'
    },
    branches: {
        path: 'branches',
        text: 'Branchs',
        icon: 'icon/branch.png'
    },
    br: {
        path: 'branches',
        text: 'Branchs',
        icon: 'icon/branch.png'
    },
    releas: {
        path: 'releases',
        text: 'Releases',
        icon: 'icon/release.png'
    },
    tags: {
        path: 'releases',
        text: 'Releases',
        icon: 'icon/release.png'
    },
    tag: {
        path: 'releases',
        text: 'Releases',
        icon: 'icon/release.png'
    },
    releases: {
        path: 'releases',
        text: 'Releases',
        icon: 'icon/release.png'
    },
    contributor: {
        path: 'contributors',
        text: 'Contributors',
        icon: 'icon/contributor.png'
    },
    contributors: {
        path: 'contributors',
        text: 'Contributors',
        icon: 'icon/contributor.png'
    },
    ask: {
        path: 'issues/new',
        text: 'Submit a new issue',
        icon: 'icon/issue.png'
    },
    submit: {
        path: 'issues/new',
        text: 'Submit a new issue',
        icon: 'icon/issue.png'
    },
    write: {
        path: 'wiki/_new',
        text: 'Create a wiki page',
        icon: 'icon/wiki.png'
    }
};

var BRANCHED_PAGES = {
    code: {
        path: 'tree/${branch}',
        text: 'Code in ${branch}',
        icon: 'icon/code.png'
    },
    commit: {
        path: 'commits/${branch}',
        text: 'Commits in ${branch}',
        icon: 'icon/commit.png'
    },
    commits: {
        path: 'commits/${branch}',
        text: 'Commits in ${branch}',
        icon: 'icon/commit.png'
    }
};

var PAGE_ORDER = ['code', 'issues', 'pulls', 'ask', 'wiki', 'commits', 'releases', 'branches', 'contributors'];

hub.getItem = function (repository, branch, page) {
    var itemData = null;
    if (BRANCHED_PAGES[page]) {
        itemData = {
            path: BRANCHED_PAGES[page].path.replace('${branch}', branch),
            text: BRANCHED_PAGES[page].text.replace('${branch}', branch),
            icon: BRANCHED_PAGES[page].icon
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
        icon: itemData.icon,
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

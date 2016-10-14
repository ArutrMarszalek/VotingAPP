'use strict';
var DataBaseConnectionResolver = {};
(function () {

    var _$q;
    angular.module('VotingApp', ['ngMaterial', 'ngAnimate', 'ngMessages'])
        .run(function ($log, $q) {
            _$q = $q;
            $log.debug("starterApp VotingApp!!");
        });
    ;

    /**
     * TO REMOVE AFTER BACKEND WORKS
     * Its simulate backend requests...
     */
    'use strict'
    var SERVER_TIME_OUT = 600;
    var _propositionIdCounter = 1000;
    var _answerIdCounteer = 8000;
    DataBaseConnectionResolver.createGetResponseForUrl = function (url) {
        console.log("sent HTTP GET request for URL: " + url);
        if (url == "/proposition/list") {
            return this.listProposition();
        }
        if (url.indexOf("/proposition/getPropositionWithAnswers/") > -1) {
            return this.returnPropositionWithAnswers(url.split('/')[3])
        }
        return {
            then: function () {
                console.log("No matching pattern for URL: " + url);
            }
        }
    };

    DataBaseConnectionResolver.createPostResponseForUrl = function (url, content) {
        console.log("sent HTTP POST request for URL: " + url);
        if (url == "/proposition/create") {
            return this.returnCreatedProposition(content);
        }
        return this.createBackendResponse().finally(function () {
                console.log("No matching pattern for URL: " + url);
            }
        )
    };

    DataBaseConnectionResolver.returnCreatedProposition = function (content) {
        var proposition = {
            id: _propositionIdCounter++,
            description: content.description,
            answers: [
                {id: _answerIdCounteer++, user: availableUsersList[0], status: PropositionStatus.IN_PROGRESS, comment:""},
                {id: _answerIdCounteer++, user: availableUsersList[1], status: PropositionStatus.IN_PROGRESS, comment:""},
                {id: _answerIdCounteer++, user: availableUsersList[2], status: PropositionStatus.IN_PROGRESS, comment:""}
            ],
            status: PropositionStatus.IN_PROGRESS,
            owner: content.owner,
        };
        return this.createBackendResponse(proposition);
    };

    DataBaseConnectionResolver.createBackendResponse = function (dataToReturn) {
        var deferred = _$q.defer();

        setTimeout(function () {
            deferred.resolve({data: dataToReturn});
        }, SERVER_TIME_OUT);

        return deferred.promise;
    };

    DataBaseConnectionResolver.listProposition = function () {
        var propositions = mockedDataList;
        return this.createBackendResponse(propositions);
    };

    DataBaseConnectionResolver.returnPropositionWithAnswers = function (propositionId) {
        for (var index = 0; index < mockedDataList.length; index++) {
            if (mockedDataList[index].id == propositionId) {
                return this.createBackendResponse(mockedDataList[index]);
            }
        }
        return this.createBackendResponse({});
    };
    var availableUsersList = [
        {name: "Artur", id: 1},
        {name: "Monika", id: 2},
        {name: "Ritka", id: 3}
    ];
    var mockedDataList = [
        {
            id: 1,
            description: "I want to buy 100 computers and monitors. I know its expensive but we can try..",
            status: PropositionStatus.IN_PROGRESS,
            owner: availableUsersList[0],
            answers: [
                {id: 1, user: availableUsersList[0], status: PropositionStatus.REJECTED,  comment:"I cant agree with that, sorry."},
                {id: 2, user: availableUsersList[1], status: PropositionStatus.IN_PROGRESS,  comment: ""},
                {id: 3, user: availableUsersList[2], status: PropositionStatus.APPROVED, comment:"Ok! good idea!"}
            ]
        },
        {
            id: 2,
            description: "W przeciwieństwie do rozpowszechnionych opinii, Lorem Ipsum nie jest tylko przypadkowym tekstem. Ma ono korzenie w klasycznej łacińskiej literaturze z 45 roku przed Chrystusem, czyli ponad 2000 lat temu! Richard McClintock, wykładowca łaciny na uniwersytecie Hampden-Sydney w Virginii, przyjrzał się uważniej jednemu z najbardziej niejasnych słów w Lorem Ipsum – consectetur – i po wielu poszukiwaniach odnalazł niezaprzeczalne źródło: Lorem Ipsum pochodzi z fragmentów (1.10.32 i 1.10.33) „de Finibus Bonorum et Malorum”, czyli „O granicy dobra i zła”, napisanej właśnie w 45 p.n.e. przez Cycerona. Jest to bardzo popularna w czasach renesansu rozprawa na temat etyki. Pierwszy wiersz Lorem Ipsum, „Lorem ipsum dolor sit amet...” pochodzi właśnie z sekcji 1.10.32.",
            status: PropositionStatus.REJECTED,
            owner: availableUsersList[1],
            answers: [
                {id: 1, user: availableUsersList[0], status: PropositionStatus.APPROVED, comment:"Ok! good idea!"},
                {id: 2, user: availableUsersList[1], status: PropositionStatus.IN_PROGRESS, comment:""},
                {id: 3, user: availableUsersList[2], status: PropositionStatus.APPROVED,  comment:"Cool! good idea!"}
            ]
        },
        {
            id: 3,
            description: "I want to eat dinner every day. Please let me do that. Lets vote!",
            status: PropositionStatus.APPROVED,
            owner: availableUsersList[2],
            answers: [
                {id: 1, user: availableUsersList[0], status: PropositionStatus.REJECTED, comment:"I cant agree with that, sorry."},
                {id: 2, user: availableUsersList[1], status: PropositionStatus.IN_PROGRESS, comment:""},
                {id: 3, user: availableUsersList[2], status: PropositionStatus.REJECTED, comment:"I cant agree with that, sorry."}
            ]
        }
    ]

    DataBaseConnectionResolver.availableUsersList = availableUsersList;

})
();


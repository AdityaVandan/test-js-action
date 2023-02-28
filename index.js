const npmCheck = require("npm-check");

const DEPENDENCY = {
  PRODUCTION: "PRODUCTION",
  DEV: "DEV"
};

const STATUS = {
  UP_TO_DATE: "UP_TO_DATE",
  MAJOR: "MAJOR",
  MINOR: "MINOR",
  PATCH: "PATCH"
};

const BUMP_TYPE = {
  MAJOR: "major",
  MINOR: "minor",
  PATCH: "patch",
  NON_SEMVER: "nonSemver"
};

const getStatus = packageObj => {
  switch (packageObj.bump) {
    case BUMP_TYPE.NON_SEMVER:
    case BUMP_TYPE.MAJOR:
      return STATUS.MAJOR;
    case BUMP_TYPE.MINOR:
      return STATUS.MINOR;
    case BUMP_TYPE.PATCH:
      return STATUS.PATCH;
    case null:
    case undefined:
      return STATUS.UP_TO_DATE;
    default:
      return STATUS.UP_TO_DATE;
  }
};

const getPackageList = options => {
  npmCheck(options).then(currentState => {
    const promisedPackageList = currentState.get("packages");
    const packages = promisedPackageList.map(packageObj => ({
      packageName: packageObj.moduleName,
      packageUrl: packageObj.homepage,
      installedVersion: packageObj.installed,
      latestVersion: packageObj.latest,
      status: getStatus(packageObj),
      isUsed: !packageObj.unused,
      type: packageObj.devDependency ? DEPENDENCY.DEV : DEPENDENCY.PRODUCTION
    }));
    console.log(packages.length);
    console.log(packages);
  });
};

const modulesToIgnore = [
  "@modules/**",
  "@utilities/**"
];

getPackageList({
  ignore: modulesToIgnore
});

/** The git errors which can be parsed from failed git commands. */
export declare enum GitError {
    SSHKeyAuditUnverified = 0,
    SSHAuthenticationFailed = 1,
    SSHPermissionDenied = 2,
    HTTPSAuthenticationFailed = 3,
    RemoteDisconnection = 4,
    HostDown = 5,
    RebaseConflicts = 6,
    MergeConflicts = 7,
    HTTPSRepositoryNotFound = 8,
    SSHRepositoryNotFound = 9,
    PushNotFastForward = 10,
    BranchDeletionFailed = 11,
    DefaultBranchDeletionFailed = 12,
    RevertConflicts = 13,
    EmptyRebasePatch = 14,
    NoMatchingRemoteBranch = 15,
    NoExistingRemoteBranch = 16,
    NothingToCommit = 17,
    NoSubmoduleMapping = 18,
    SubmoduleRepositoryDoesNotExist = 19,
    InvalidSubmoduleSHA = 20,
    LocalPermissionDenied = 21,
    InvalidMerge = 22,
    InvalidRebase = 23,
    NonFastForwardMergeIntoEmptyHead = 24,
    PatchDoesNotApply = 25,
    BranchAlreadyExists = 26,
    BadRevision = 27,
    NotAGitRepository = 28,
    CannotMergeUnrelatedHistories = 29,
    LFSAttributeDoesNotMatch = 30,
    BranchRenameFailed = 31,
    PathDoesNotExist = 32,
    InvalidObjectName = 33,
    OutsideRepository = 34,
    LockFileAlreadyExists = 35,
    NoMergeToAbort = 36,
    LocalChangesOverwritten = 37,
    UnresolvedConflicts = 38,
    PushWithFileSizeExceedingLimit = 39,
    HexBranchNameRejected = 40,
    ForcePushRejected = 41,
    InvalidRefLength = 42,
    ProtectedBranchRequiresReview = 43,
    ProtectedBranchForcePush = 44,
    ProtectedBranchDeleteRejected = 45,
    ProtectedBranchRequiredStatus = 46,
    PushWithPrivateEmail = 47,
    ConfigLockFileAlreadyExists = 48,
    RemoteAlreadyExists = 49,
    TagAlreadyExists = 50
}
/** A mapping from regexes to the git error they identify. */
export declare const GitErrorRegexes: {
    'ERROR: ([\\s\\S]+?)\\n+\\[EPOLICYKEYAGE\\]\\n+fatal: Could not read from remote repository.': GitError;
    "fatal: Authentication failed for 'https://": GitError;
    'fatal: Authentication failed': GitError;
    'fatal: Could not read from remote repository.': GitError;
    'The requested URL returned error: 403': GitError;
    'fatal: The remote end hung up unexpectedly': GitError;
    "fatal: unable to access '(.+)': Failed to connect to (.+): Host is down": GitError;
    "Cloning into '(.+)'...\nfatal: unable to access '(.+)': Could not resolve host: (.+)": GitError;
    'Failed to merge in the changes.': GitError;
    '(Merge conflict|Automatic merge failed; fix conflicts and then commit the result)': GitError;
    "fatal: repository '(.+)' not found": GitError;
    'ERROR: Repository not found': GitError;
    "\\((non-fast-forward|fetch first)\\)\nerror: failed to push some refs to '.*'": GitError;
    "error: unable to delete '(.+)': remote ref does not exist": GitError;
    '\\[remote rejected\\] (.+) \\(deletion of the current branch prohibited\\)': GitError;
    "error: could not revert .*\nhint: after resolving the conflicts, mark the corrected paths\nhint: with 'git add <paths>' or 'git rm <paths>'\nhint: and commit the result with 'git commit'": GitError;
    "Applying: .*\nNo changes - did you forget to use 'git add'\\?\nIf there is nothing left to stage, chances are that something else\n.*": GitError;
    'There are no candidates for (rebasing|merging) among the refs that you just fetched.\nGenerally this means that you provided a wildcard refspec which had no\nmatches on the remote end.': GitError;
    "Your configuration specifies to merge with the ref '(.+)'\nfrom the remote, but no such ref was fetched.": GitError;
    'nothing to commit': GitError;
    "No submodule mapping found in .gitmodules for path '(.+)'": GitError;
    "fatal: repository '(.+)' does not exist\nfatal: clone of '.+' into submodule path '(.+)' failed": GitError;
    "Fetched in submodule path '(.+)', but it did not contain (.+). Direct fetching of that commit failed.": GitError;
    "fatal: could not create work tree dir '(.+)'.*: Permission denied": GitError;
    'merge: (.+) - not something we can merge': GitError;
    'invalid upstream (.+)': GitError;
    'fatal: Non-fast-forward commit does not make sense into an empty head': GitError;
    'error: (.+): (patch does not apply|already exists in working directory)': GitError;
    "fatal: A branch named '(.+)' already exists.": GitError;
    "fatal: bad revision '(.*)'": GitError;
    'fatal: [Nn]ot a git repository \\(or any of the parent directories\\): (.*)': GitError;
    'fatal: refusing to merge unrelated histories': GitError;
    'The .+ attribute should be .+ but is .+': GitError;
    'fatal: Branch rename failed': GitError;
    "fatal: Path '(.+)' does not exist .+": GitError;
    "fatal: Invalid object name '(.+)'.": GitError;
    "fatal: .+: '(.+)' is outside repository": GitError;
    'Another git process seems to be running in this repository, e.g.': GitError;
    'fatal: There is no merge to abort': GitError;
    'error: (?:Your local changes to the following|The following untracked working tree) files would be overwritten by checkout:': GitError;
    'You must edit all merge conflicts and then\nmark them as resolved using git add': GitError;
    'error: GH001: ': GitError;
    'error: GH002: ': GitError;
    'error: GH003: Sorry, force-pushing to (.+) is not allowed.': GitError;
    'error: GH005: Sorry, refs longer than (.+) bytes are not allowed': GitError;
    'error: GH006: Protected branch update failed for (.+)\nremote: error: At least one approved review is required': GitError;
    'error: GH006: Protected branch update failed for (.+)\nremote: error: Cannot force-push to a protected branch': GitError;
    'error: GH006: Protected branch update failed for (.+)\nremote: error: Cannot delete a protected branch': GitError;
    'error: GH006: Protected branch update failed for (.+).\nremote: error: Required status check "(.+)" is expected': GitError;
    'error: GH007: Your push would publish a private email address.': GitError;
    'error: could not lock config file (.+): File exists': GitError;
    'fatal: remote (.+) already exists.': GitError;
    "fatal: tag '(.+)' already exists": GitError;
};
/**
 * The error code for when git cannot be found. This most likely indicates a
 * problem with dugite itself.
 */
export declare const GitNotFoundErrorCode = "git-not-found-error";
/** The error code for when the path to a repository doesn't exist. */
export declare const RepositoryDoesNotExistErrorCode = "repository-does-not-exist-error";

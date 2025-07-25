#[macro_export]
macro_rules! execute {
    // rule for simple queries
    ($db:expr, $query:expr) => {
        ::worker::query!($db, $query).unwrap().all().await.unwrap()
    };
    // rule for parameterized queries
    ($db:expr, $query:expr, $($args:expr),* $(,)?) => {{
        ::worker::query!($db, $query, $($args),*).unwrap().all().await.unwrap()
    }};
}

#[macro_export]
macro_rules! first {
    // rule for simple queries
    ($db:expr, $query:expr) => {
        ::worker::query!($db, $query)?.all().await?.first()
    };
    // rule for parameterized queries
    ($db:expr, $query:expr, $($args:expr),* $(,)?) => {{
        ::worker::query!($db, $query, $($args),*).unwrap().first(None).await
    }};
}

#[macro_export]
macro_rules! query {
    // rule for simple queries
    ($db:expr, $query:expr) => {
        ::worker::query!($db, $query)?.all().await.unwrap().results().unwrap()
    };
    // rule for parameterized queries
    ($db:expr, $query:expr, $($args:expr),* $(,)?) => {{
        ::worker::query!($db, $query, $($args),*).unwrap().all().await.unwrap().results().unwrap()
    }};
}

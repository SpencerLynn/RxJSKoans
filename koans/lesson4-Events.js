module('Lesson 4 - Events');

test('listening to events', function() {
    var received = '';
    var subscription = $(document)
      .toObservable('foo')
      .subscribe(function(e) { received += e.payload; });

    $(document).trigger({ type: 'foo', payload: 'M' });
    $(document).trigger({ type: 'foo', payload: 'A' });
    $(document).trigger({ type: 'foo', payload: 'T' });
    subscription.dispose();
    $(document).trigger({ type: 'foo', payload: 'T' });

    equals(received, 'MAT');
});

test('listening to the right events', function() {
    var received = '';
    var subscription = $(document)
      .toObservable('foo')
      .subscribe(function(e) { received += e.payload; });

    $(document).trigger({ type: 'foo', payload: 'M' });
    $(document).trigger({ type: 'bar', payload: 'A' });
    $(document).trigger({ type: 'foo', payload: 'T' });
    $(document).trigger({ type: 'foo', payload: 'T' });
    subscription.dispose();

    equals(received, 'MTT');
});
